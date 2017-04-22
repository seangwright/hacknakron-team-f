import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';

import { LUCOption, ParcelResponse } from './models';

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  getLUCOptions(): Observable<LUCOption[]> {
    return this.http.get(`${environment.baseApiUrl}/LUCOption`)
      .map(resp => resp.json());
  }

  getVacantParcel(): Observable<ParcelResponse> {
    return this.http.get(`${environment.baseApiUrl}/vacant-parcel`)
      .map(resp => resp.json());
  }

  getParcelByLUCCode(lucCode: string): Observable<ParcelResponse> {
    return this.http.get(`${environment.baseApiUrl}/parcel`, { params: { lucCode }})
      .map(resp => resp.json());
  }

}
