import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { ChartDataService } from './chart-data.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ChartComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ChartsModule
      ],
      providers: [ChartDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it('should load initial data', () => {
    expect(comp.company).toEqual('HD');
    expect(comp.startDate).toEqual('2016-12-26');
    expect(comp.endDate).toEqual('2018-12-28');
    expect(comp.minDate).toEqual('2016-12-26');
    expect(comp.maxDate).toEqual('2018-12-28');
    expect(comp.dateError).toEqual(false);
    expect(comp.companies).toEqual([
      {title: 'Home Depot Inc.', value: 'HD'}, {title: 'The Walt Disney Company', value: 'DIS'},
      {title: 'Microsoft Corporation', value: 'MSFT'}, {title: 'The Boeing Company', value: 'BA'},
      {title: '3M Company', value: 'MMM'}, {title: 'Pfizer Inc.', value: 'PFE'},
      {title: 'Nike Inc.', value: 'NKE'}, {title: 'Johnson & Johnson', value: 'JNJ'},
      {title: 'McDonald\'s Corporation', value: 'MCD'}, {title: 'Intel Corporation', value: 'INTC'}]);
  });

  describe('function stringToDOM', () => {
    it('should return a json object', () => {
      expect(AppComponent.stringToDOM('')).toEqual(jasmine.any(Object));
      expect(AppComponent.stringToDOM(0)).toEqual(jasmine.any(Object));
      expect(AppComponent.stringToDOM('Hello')).toEqual(jasmine.any(Object));
      expect(AppComponent.stringToDOM({})).toEqual(jasmine.any(Object));
      expect(AppComponent.stringToDOM([])).toEqual(jasmine.any(Object));
      expect(AppComponent.stringToDOM(false)).toEqual(jasmine.any(Object));
    });
  });

  describe('function JSONFromDOM', () => {
    it('should return a json object', () => {
      expect(AppComponent.JSONFromDOM(AppComponent.stringToDOM('<code>{"dataset":{"id":1234}}</code>'))).toEqual(jasmine.any(Object));
      expect(AppComponent.JSONFromDOM(AppComponent.stringToDOM('<code>{"a":1}</code>'))).toEqual(jasmine.any(Object));
    });

    it('should throw an error', () => {
      /* tslint:disable:semicolon */
      const error = new Error('Invalid string');
      expect(() => {AppComponent.JSONFromDOM(AppComponent.stringToDOM('<code></code>'))}).toThrow(error);
      expect(() => {AppComponent.JSONFromDOM(AppComponent.stringToDOM('<code>a</code>'))}).toThrow(error);
      expect(() => {AppComponent.JSONFromDOM(AppComponent.stringToDOM('<code>{a:1}</code>'))}).toThrow(error);
    });
  });

  describe('function getStockPrices', () => {
    const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('should be called on init', (done) => {
      spyOn(comp, 'getStockPrices');
      comp.ngOnInit();

      fixture.whenStable().then(() => {
        expect(comp.getStockPrices).toHaveBeenCalled();
        done();
      });
    });

    it('should be called on selecting a company', (done) => {
      const select = fixture.debugElement.query(By.css('select'));
      spyOn(comp, 'getStockPrices');
      comp.company = 'HD';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(select.nativeElement.value).toEqual('HD');
        select.nativeElement.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        expect(comp.getStockPrices).toHaveBeenCalled();
        done();
      });
    });
    it('should be called on selecting a date', (done) => {
      const select = fixture.debugElement.query(By.css('input[type=date]'));
      spyOn(comp, 'getStockPrices');
      comp.startDate = '2017-12-26';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(select.nativeElement.value).toEqual('2017-12-26');
        select.nativeElement.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        expect(comp.getStockPrices).toHaveBeenCalled();
        done();
      });
    });
    it('should update the \'data\' and \'labels\' arrays in service Chartdata', (done) => {
      const service = TestBed.get(ChartDataService);
      const numLabels = 254; // default returned from date range (2016-12-26-2018-12-28)

      spyOn(comp, 'getStockPrices');
      comp.ngOnInit();

      fixture.whenStable().then(() => {
        expect(comp.getStockPrices).toHaveBeenCalled();
        expect(service.data.length).toBe(1);
        expect(service.labels.length).toBe(numLabels);
        done();
      });
    });
  });
});
