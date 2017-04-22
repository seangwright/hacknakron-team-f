import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

import { ApiService } from './api.service';
import { LucCategory, LucOption, ParcelResponse } from './models';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Search Parcels by Land use Code';
  optionsModel: number[];

  myOptions: IMultiSelectOption[] = [];
  multiSelectSettings: IMultiSelectSettings = {};

  parcels: LocalDataSource;
  lucCategories: LucCategory[] = [];
  selectedCategory: number;
  lucOptions: LucOption[] = [];

  smartTableSettings: any = {
    pager: {
      display: false
    },
    columns: {
      number: {
        title: 'Parcel #',
        sort: true
        },
      address: {
        title: 'Address',
        sort: true
      },
      postal: {
        title: 'ZIP',
        sort: true
      },
      areaAcres: {
        title: 'Acreage',
        sort: true
      },
      areaSqft: {
        title: 'Sq. Ft.',
        sort: true
      },
      lucId: {
        title: 'LUC',
        sort: true
      },
      appraisal: {
        title: 'Appraisal Amt',
        sort: true
      },
      lastSaleDate: {
        title: 'Last Sale Date',
        sort: true
      },
      lastSaleAmount: {
        title: 'Last Sale Amt',
        sort: true
      },
      pricePerSqft: {
        title: '$/Sq. Ft.',
        sort: true
      }
    }
  }

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.multiSelectSettings = {
      enableSearch: true,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default btn-block',
      displayAllSelectedText: true
    };

    this.apiService.getLucCategories()
      .subscribe(categories => {
        this.lucCategories = categories;
      });
  }

  searchLucOptions() {
    this.apiService.getLucOptions(this.selectedCategory)
      .subscribe(options => {
        this.lucOptions = options;
      });
  }

  searchParcels() {
    const ids = this.myOptions
      .map(o => o.id);

    this.apiService.getParcelsByLucCodes(ids)
      .subscribe(parcels => {
        this.parcels = new LocalDataSource(parcels);
      });
  }

  doSafeDivision(dividend: number, divisor: number): number {
    if (divisor == 0.00) {
      return 0.00;
    }
    else {
      return dividend / divisor;
    }
  }


}
