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
    lastSaleDate: new Date().toLocaleDateString(),
    pricePerSqft: 0,
    lastSaleAmount: 1200
  }, {
    number: '2',
    address: '2343 test st.',
    postal: '34543',
    areaSqft: 1000,
    areaAcres: 1,
    lucId: 2,
    appraisal: 12000,
    lastSaleDate: new Date().toLocaleDateString(),
    pricePerSqft: 0,
    lastSaleAmount: 12023
  }, {
    number: '3',
    address: '4565 main st.',
    postal: '2342',
    areaSqft: 1000,
    areaAcres: 23,
    lucId: 3,
    appraisal: 12000,
    lastSaleDate: new Date().toLocaleDateString(),
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
    code: 'A',
    name: 'Agriculture'
  }];

  private testOptions: LucOption[] = [{
    id: 1,
    name: 'Residential, Vacant Land, Lot',
  }, {
    id: 2,
    name: 'Single Family Dwelling, Platted Lot'
  }, {
    id: 3,
    name: 'Single Family, O-9.99AC'
  }];

  constructor(
    private http: Http
  ) { }

  getLucCategories(): Observable<LucCategory[]> {
    return !environment.production
      ? Observable.of(this.testCategories)
      : this.http.get(`${environment.baseApiUrl}categories`)
        .map(resp => resp.json())
        .map(categories => categories.map(c => {
          return { name: c.name, code: c.use_class };
        }));
  }

  getLucOptions(lucCategoryCode: number): Observable<LucOption[]> {
    return !environment.production
      ? Observable.of(this.testOptions)
      : this.http.get(`${environment.baseApiUrl}land_use_codes/${lucCategoryCode}`)
        .map(resp => resp.json())
        .map(options => options.map(o => {
          return { id: o.id, name: o.label };
        }));
  }

  getParcelsByLucCodes(lucCodes: number[]): Observable<ParcelResponse[]> {
    const codes = lucCodes.join(',');

    return (!environment.production
      ? Observable.of(this.testParcles)
      : this.http.get(`${environment.baseApiUrl}parcels/${codes}`)
        .map(resp => resp.json()))
      .map(parcels => {
        parcels.forEach((p: any) => {
          // Map from api response to client app model
          p.pricePerSqft = this.doSafeDivision(p.lastSaleAmount, p.areaSqft);
          p.number = p.parcel_id;
          p.postal = p.zip_code;
          p.areaAcres = p.acres;
          p.lucId = p.land_use_code_id;
          p.price = p.appraisal;
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
