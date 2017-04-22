import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

import { ApiService } from './api.service';
import { LucCategory, LucOption, ParcelResponse } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  optionsModel: number[];

  myOptions: IMultiSelectOption[] = [];
  multiSelectSettings: IMultiSelectSettings = {};

  parcels: ParcelResponse[];
  lucCategories: LucCategory[];
  selectedCategory: number;
  lucOptions: LucOption[];
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.multiSelectSettings = {
      enableSearch: true,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true
    };

    this.apiService.getLucCategories()
      .subscribe(categories => {
        this.lucCategories = categories;
      });
  }

  searchLucOptions() {
    this.apiService.getLucOptions('')
      .subscribe(options => {
        this.lucOptions = options;
      });
  }

  searchParcels() {
    this.apiService.getParcelsByLucCodes(this.optionsModel)
      .subscribe(parcels => {
        this.parcels = parcels;
      });
  }

}
