import {TestBed, inject} from '@angular/core/testing';
import {HttpEventType} from '@angular/common/http';
import {environment} from '../environments/environment';

import {ChartDataService} from './chart-data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ChartDataService', () => {
  const url = `https://www.quandl.com/api/v3/datasets/EOD/HD?start_date=2017-12-26&end_date=2017-12-28
          &api_key=${environment.quandlApiKey}`;
  const mockData = '<!DOCTYPE html><html></html>';

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should create the service', () => {
    const service: ChartDataService = TestBed.get(ChartDataService);
    expect(service).toBeTruthy();
  });

  it('should load initial data', () => {
    const service: ChartDataService = TestBed.get(ChartDataService);
    expect(service.data).toEqual([]);
    expect(service.labels).toEqual([]);
  });

  describe('function getData', () => {
    it('should return data with responseType \'text\'',
      inject(
        [HttpTestingController, ChartDataService],
        (backendMock: HttpTestingController, dataService: ChartDataService) => {
          dataService.getData(url).subscribe((event) => {
            switch (event.type) {
              case HttpEventType.Response:
                expect(event.body).toEqual(mockData);
                expect(event.body).toEqual(jasmine.any(String));
            }
          });

          const mockRequest = backendMock.expectOne(url);
          expect(mockRequest.request.responseType).toEqual('text');

          mockRequest.flush(mockData);
          backendMock.verify();
        }
      )
    );
  });
});
