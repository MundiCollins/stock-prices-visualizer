import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  constructor(private http: HttpClient) {
  }

  data = [];
  labels = [];

  getData(url, responseType = 'text') {
    const req = new HttpRequest('GET', url, {responseType});
    return this.http.request(req);
  }
}
