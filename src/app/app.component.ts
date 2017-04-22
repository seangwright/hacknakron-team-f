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
  title = 'Search Parcels by Land Use Code';
  optionsModel: number[] = [];

  myOptions: IMultiSelectOption[] = [];
  multiSelectSettings: IMultiSelectSettings = {};

  parcels: LocalDataSource = undefined;
  lucCategories: LucCategory[] = [];
  selectedCategory = 0;
  lucOptions: LucOption[] = [];

  smartTableSettings: any = {
    pager: {
      display: false
    },
    hideSubHeader: true,
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false
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
        sort: true,
        valuePrepareFunction: (lucId: number) => {
          const lucOption = this.lucOptions.find(luc => luc.id === lucId);
          return lucOption
            ? lucOption.name
            : 'N/A';
        }
      },
      appraisal: {
        title: 'Appraisal Amt',
        sort: true,
        valuePrepareFunction: (value: number) => {
          return `$${(Math.round(value * 100) / 100).toFixed(2)}`;
        }
      },
      lastSaleDate: {
        title: 'Last Sale Date',
        sort: true
      },
      lastSaleAmount: {
        title: 'Last Sale Amt',
        sort: true,
        valuePrepareFunction: (value: number) => {
          return `$${(Math.round(value * 100) / 100).toFixed(2)}`;
        }
      },
      pricePerSqft: {
        title: '$/Sq. Ft.',
        sort: true,
        valuePrepareFunction: (value: number) => {
          return `$${(Math.round(value * 100) / 100).toFixed(2)}`;
        }
      }
    }
  };

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

  resetData() {
    this.selectedCategory = 0;
    this.lucOptions = [];
    this.myOptions = [];
    this.parcels = undefined;
  }

}
