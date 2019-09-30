import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ChartDataService} from './chart-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private chartData: ChartDataService) {
  }

  company = 'HD'; // set Home Depot Inc. as default
  companies = [
    {title: 'Home Depot Inc.', value: 'HD'}, {title: 'The Walt Disney Company', value: 'DIS'},
    {title: 'Microsoft Corporation', value: 'MSFT'}, {title: 'The Boeing Company', value: 'BA'}];

  ngOnInit() {
    this.getStockPrices();
  }

  changeCompany() {
    this.getStockPrices();
  }

  getStockPrices() {
    const url = `https://www.quandl.com/api/v3/datasets/EOD/${this.company}?start_date=2017-12-26&end_date=2017-12-28
    &api_key=${environment.quandlApiKey}`;
    this.http.get(url, {responseType: 'text'}).subscribe(
      (data) => {
        const dataDOM = AppComponent.stringToDOM(data);
        const dataJSON = AppComponent.JSONFromDOM(dataDOM);
        if (dataJSON.dataset) {
          this.chartData.labels = dataJSON.dataset.data.map(x => x[0]);
          this.chartData.data = [{data: dataJSON.dataset.data.map(x => x[4])}];
        }
      },
      (error) => console.log('error', error)
    );
  }

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
}
