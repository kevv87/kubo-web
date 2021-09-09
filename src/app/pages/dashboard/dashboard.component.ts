import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public pieData:any;
  public salesChart;
  public nuChart;
  public nukwaChart;
  public andalanChart;
  public dribeChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  private _seed = Date.now();

  rand(min, max) {
    min = min || 0;
    max = max || 0;
    this._seed = (this._seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
  }

  numbers(config) {
    var cfg = config || {};
    var min = cfg.min || 0;
    var max = cfg.max || 100;
    var from = cfg.from || [];
    var count = cfg.count || 8;
    var decimals = cfg.decimals || 8;
    var continuity = cfg.continuity || 1;
    var dfactor = Math.pow(10, decimals) || 0;
    var data = [];
    var i, value;

    const rand = this.rand(min, max)
  
    for (i = 0; i < count; ++i) {
      value = (from[i] || 0) + this.rand(min, max);
      if (this.rand(undefined, undefined) <= continuity) {
        data.push(Math.round(dfactor * value) / dfactor);
      } else {
        data.push(null);
      }
    }

    console.log(data);
  
    return data;
  }

  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];

    const DATA_COUNT = 5;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
    const exampleLabels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];

    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };

    this.pieData = {
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'Dataset 1',
          data: this.numbers(NUMBER_CFG),
          backgroundColor: Object.values(CHART_COLORS),
        }
      ]
    };

    const exampleOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false
        }
      }
    }

    this.data = this.datasets[0];


    let chartNu = document.getElementById('uso-nu');
    let chartNukwa = document.getElementById('uso-nukwa');
    let chartAndalan = document.getElementById('uso-andalan');
    let chartDribe = document.getElementById('uso-dribe');

    this.nuChart = new Chart(chartNu, {
      type:'pie',
      data:this.pieData,
      options:exampleOptions,
    });

    this.nukwaChart = new Chart(chartNukwa,{
      type:'pie',
      data:this.pieData,
      options:exampleOptions,
    });

    this.andalanChart = new Chart(chartAndalan, {
      type:'pie',
      data:this.pieData,
      options:exampleOptions,
    });

    this.dribeChart = new Chart(chartDribe, {
      type:'pie',
      data:this.pieData,
      options:exampleOptions,
    })



    let chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    let ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    let chartSales = document.getElementById('chart-sales');

    
  }


  public updateOptions() {
  }

}
