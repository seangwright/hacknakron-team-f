import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  optionsModel: number[];

  myOptions: IMultiSelectOption[] = [];
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.myOptions = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ];
  }
  onChange() {
    console.log(this.optionsModel);
  }

}
