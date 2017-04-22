import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { environment } from '../environments/environment';

import { LucCategory, LucOption, ParcelResponse } from './models';

@Injectable()
export class ApiService {
  private testParcles = [{
    number: 1,
    address: '12 test st.'
  }, {
    number: 2,
    address: '2343 test st.'
  }, {
    number: 3,
    address: '4565 main st.'
  }];

  private testCategories: LucCategory[] = [{
    code: 'C',
    name: 'Commercial'
  }, {
    code: 'R',
    name: 'Residential'
  }, {
    code: 'P',
    name: 'Parking'
  }];

  private testOptions: LucOption[] = [{
    id: 2343,
    name: 'Test 1'
  }, {
    id: 3454,
    name: 'Test 2'
  }, {
    id: 232,
    name: 'Test 3'
  }];

  constructor(
    private http: Http
  ) { }

  getLucCategories(): Observable<LucCategory[]> {
    return Observable.of(this.testCategories) ||
      this.http.get(`${environment.baseApiUrl}categories`)
        .map(resp => resp.json() as LucCategory[]);
  }

  getLucOptions(lucCategoryCode: number): Observable<LucOption[]> {
    return Observable.of(this.testOptions) ||
      this.http.get(`${environment.baseApiUrl}land_use_codes/${lucCategoryCode}`)
        .map(resp => resp.json() as LucOption[]);
  }

  getParcelsByLucCodes(lucCodes: number[]): Observable<any[]> {
    return Observable.of(this.testParcles) ||
      this.http.get(`${environment.baseApiUrl}parcel`, { params: { lucCodes } })
        .map(resp => resp.json());
  }

}
