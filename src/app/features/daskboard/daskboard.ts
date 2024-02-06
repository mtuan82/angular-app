import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  templateUrl: 'daskboard.html',
  styleUrls: ['daskboard.scss'],
})

export class DashboardComponent {

  constructor() { }

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [16500, 15009, 81000, 18100, 15600, 55000, 14000], label: 'Order' },
      { data: [1280, 4150, 4100, 1190, 8160, 2107, 1900], label: 'Return' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    
  };

}