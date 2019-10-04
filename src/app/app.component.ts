import {Component, OnInit} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ChartDataService} from './chart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private chartData: ChartDataService) {
  }

  company = 'HD'; // set Home Depot Inc. as default
  startDate = '2016-12-26';
  endDate = '2018-12-28';
  minDate = '2016-12-26';
  maxDate = '2018-12-28';
  dateError = false;
  companies = [
    {title: 'Home Depot Inc.', value: 'HD'}, {title: 'The Walt Disney Company', value: 'DIS'},
    {title: 'Microsoft Corporation', value: 'MSFT'}, {title: 'The Boeing Company', value: 'BA'},
    {title: '3M Company', value: 'MMM'}, {title: 'Pfizer Inc.', value: 'PFE'},
    {title: 'Nike Inc.', value: 'NKE'}, {title: 'Johnson & Johnson', value: 'JNJ'},
    {title: 'McDonald\'s Corporation', value: 'MCD'}, {title: 'Intel Corporation', value: 'INTC'}];

  static stringToDOM(str) {
    try {
      const parser = new DOMParser();
      return parser.parseFromString(str, 'text/html');
    } catch (error) {
      throw new Error('Invalid string');
    }
  }

  static JSONFromDOM(elem, tag = 'code') {
    try {
      let data = elem.getElementsByTagName(tag)[0].innerHTML;
      data = data.replace(/<a.*<\/a>/, '');  // remove unexpected link tags
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Invalid string');
    }
  }

  ngOnInit() {
    this.getStockPrices();
  }

  changeCompany() {
    this.getStockPrices();
  }

  changeDate() {
    this.dateError = this.startDate > this.endDate;
    this.getStockPrices();
  }

  getStockPrices() {
    if (this.dateError) {
      return;
    }
    const url = `https://www.quandl.com/api/v3/datasets/EOD/${this.company}?start_date=${this.startDate}&end_date=${this.endDate}
    &api_key=${environment.quandlApiKey}`;
    this.chartData.getData(url, 'text').subscribe((event) => {
      if (event.type === HttpEventType.Response) {
        const data = event.body;
        const dataDOM = AppComponent.stringToDOM(data);
        const dataJSON = AppComponent.JSONFromDOM(dataDOM);
        if (dataJSON.dataset) {
          const labels = [];
          const dataset = [{data: []}];
          dataJSON.dataset.data.forEach((item) => {
            labels.unshift(item[0]);
            dataset[0].data.unshift(item[4]);
          });
          this.chartData.labels = labels;
          this.chartData.data = dataset;
        }
      }
    });

  }
}
