import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChartsModule} from 'ng2-charts';

import {ChartComponent} from './chart.component';
import {ChartDataService} from '../chart-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [
        ChartsModule, HttpClientTestingModule
      ],
      providers: [ChartDataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data', () => {
    expect(component.chartOptions).toEqual({
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0
        }
      }
    });
    expect(component.chartColors).toEqual([
      {
        borderColor: 'black',
        backgroundColor: 'transparent',
        borderWidth: 1
      },
    ]);
    expect(component.chartType).toEqual('line');
    expect(component.showLegend).toEqual(false);
  });
});
