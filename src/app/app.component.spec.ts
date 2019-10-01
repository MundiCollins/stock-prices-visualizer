import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { ChartDataService } from './chart-data.service';

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
        FormsModule
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

  it(`should load initial data`, () => {
    expect(comp.company).toEqual('HD');
    expect(comp.startDate).toEqual('2017-12-26');
    expect(comp.endDate).toEqual('2017-12-28');
    expect(comp.dateError).toEqual(false);
    expect(comp.minDate).toEqual('2017-12-26');
    expect(comp.maxDate).toEqual('2017-12-28');
    expect(comp.companies).toEqual([
      {title: 'Home Depot Inc.', value: 'HD'}, {title: 'The Walt Disney Company', value: 'DIS'},
      {title: 'Microsoft Corporation', value: 'MSFT'}, {title: 'The Boeing Company', value: 'BA'},
      {title: '3M Company', value: 'MMM'}, {title: 'Pfizer Inc.', value: 'PFE'},
      {title: 'Nike Inc.', value: 'NKE'}, {title: 'Johnson & Johnson', value: 'JNJ'},
      {title: 'McDonald\'s Corporation', value: 'MCD'}, {title: 'Intel Corporation', value: 'INTC'}]);
  });
});
