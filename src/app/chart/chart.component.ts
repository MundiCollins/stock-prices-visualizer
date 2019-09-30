import { Component, OnInit } from '@angular/core';
import { ChartDataService } from '../chart-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private chartData: ChartDataService) {
  }

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0
      }
    }
  };
  chartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'transparent',
      borderWidth: 1
    },
  ];
  chartType = 'line';
  showLegend = false;

  ngOnInit() {
  }

}
