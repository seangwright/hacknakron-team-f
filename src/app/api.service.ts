import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { environment } from '../environments/environment';

import { LucCategory, LucOption, ParcelResponse } from './models';

@Injectable()
export class ApiService {
  private testParcles: ParcelResponse[] = [{
    number: '1',
    address: '12 test st.',
    postal: '53454',
    areaSqft: 1000,
    areaAcres: 10,
    lucId: 1,
    appraisal: 12000,
    lastSaleDate: new Date(),
    pricePerSqft: 0,
    lastSaleAmount: 1200
  }, {
    number: '2',
    address: '2343 test st.',
    postal: '34543',
    areaSqft: 1000,
    areaAcres: 1,
    lucId: 10,
    appraisal: 12000,
    lastSaleDate: new Date(),
    pricePerSqft: 0,
    lastSaleAmount: 12023
  }, {
    number: '3',
    address: '4565 main st.',
    postal: '2342',
    areaSqft: 1000,
    areaAcres: 23,
    lucId: 14,
    appraisal: 12000,
    lastSaleDate: new Date(),
    pricePerSqft: 0,
    lastSaleAmount: 120223
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
    name: 'Test 1',
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

  getParcelsByLucCodes(lucCodes: number[]): Observable<ParcelResponse[]> {
    return (Observable.of(this.testParcles) ||
      this.http.get(`${environment.baseApiUrl}parcel`, { params: { lucCodes } })
        .map(resp => resp.json() as ParcelResponse[]))
      .map(parcels => {
        parcels.forEach(p => {
          p.pricePerSqft = this.doSafeDivision(p.lastSaleAmount, p.areaSqft);
          return p;
        });

        return parcels;
      });
  }

  private doSafeDivision(dividend: number, divisor: number): number {
    if (!divisor) {
      return 0;
    } else {
      return dividend / divisor;
    }
  }

}
