import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

import { LucCategory, LucOption, ParcelResponse } from './models';

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  getLucCategories(): Observable<LucCategory[]> {
    return this.http.get(`${environment.baseApiUrl}/categories`)
      .map(resp => resp.json() as LucCategory[]);
  }

  getLucOptions(lucCategoryCode: string): Observable<LucOption[]> {
    return this.http.get(`${environment.baseApiUrl}/land_use_codes/${lucCategoryCode}`)
      .map(resp => resp.json() as LucOption[]);
  }

  getParcelByLucCode(lucCode: string): Observable<ParcelResponse> {
    return this.http.get(`${environment.baseApiUrl}/parcel`, { params: { lucCode }})
      .map(resp => resp.json());
  }

}
