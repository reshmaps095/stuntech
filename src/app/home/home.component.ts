import { Component, OnInit } from '@angular/core';
import { Status, StatusData } from '../database/status.data';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs';
import * as _ from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public statusData: Status[] = [];
  public selectedIndex: number = 0;
  items: any;
  List: any;
  sortsForm: any;
  searchForm: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.sortsForm = this.fb.group({
      sortcontrol: [''],
    });
    this.searchForm = this.fb.group({
      searchInput: [''],
    });
  }

  ngOnInit(): void {
    this.statusData = StatusData.datas;
    this.handleData();
  }

  handleData() {
    this.http.get('../../assets/JSON/data.json').subscribe((item: any) => {
      this.items = item.datas;
      console.log(this.items);
    });
  }

  FiletrByStatus(i: number) {
    this.selectedIndex = i;
    this.http.get('../../assets/JSON/data.json').subscribe((data: any) => {
      this.List = data.datas;
      console.log(i);
      if (i == 0) {
        this.items = data.datas;
      } else if (i == 1) {
        this.items = this.List.filter((item: any) => item.status == 'open');
      } else if (i == 2) {
        this.items = this.List.filter(
          (item: any) => item.status == 'completed'
        );
      } else if (i == 3) {
        this.items = this.List.filter(
          (item: any) => item.status == 'cancelled'
        );
      }
    });
  }

  sortData(types: any) {
    console.log(types.target.value);
    this.items = _.orderBy(this.items, ['GigName'], [types.target.value]);
    console.log(this.items);
  }
  searchDta() {
    this.http.get('../../assets/JSON/data.json').subscribe((data: any) => {
      if (this.searchForm.value.searchInput !== '') {
        this.items = data.datas.filter(
          (item: any) =>
            item.GigName.toLowerCase().indexOf(
              this.searchForm.value.searchInput.toLowerCase()
            ) > -1
        );
      } else {
        this.items = data.datas;
      }
    });
  }
}
