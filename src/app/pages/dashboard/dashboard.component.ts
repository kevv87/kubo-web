import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { RestService } from 'src/app/services/rest.service';
import { isJSDocThisTag } from 'typescript';

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

  // Numbers
  public jobs;
  public users;
  public hours;
  public percentage;

  // Data for the charts
  public andalanData;
  public nukwaData;
  public nuData;
  public dribeData;

  // Charts
  public salesChart;
  public nuChart;
  public nukwaChart;
  public andalanChart;
  public dribeChart;
  public colasChart;

  // Month/Year buttons
  public clicked: boolean = true;
  public clicked1: boolean = false;

  private _seed = Date.now();

  constructor(private restService: RestService){}

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

    // Inicializando graficos
    this.andalanData = {
      labels: ['Usado', 'Sin usar'],
      datasets:[
        { 
          label:'Dataset 1',
          data:[1,0],
          backgroundColor: Object.values(CHART_COLORS)
        }
      ]
    };

    this.nukwaData = {
      labels: ['Usado', 'Sin usar'],
      datasets:[
        { 
          label:'Dataset 1',
          data:[1,0],
          backgroundColor: Object.values(CHART_COLORS)
        }
      ]
    };
    this.dribeData = {
      labels: ['Usado', 'Sin usar'],
      datasets:[
        { 
          label:'Dataset 1',
          data:[1,0],
          backgroundColor: Object.values(CHART_COLORS)
        }
      ]
    };
    this.nuData = {
      labels: ['Usado', 'Sin usar'],
      datasets:[
        { 
          label:'Dataset 1',
          data:[1,0],
          backgroundColor: Object.values(CHART_COLORS)
        }
      ]
    };

    this.nuChart = new Chart(chartNu, {
      type:'pie',
      data:this.nuData,
      options:exampleOptions,
    });

    this.nukwaChart = new Chart(chartNukwa,{
      type:'pie',
      data:this.nukwaData,
      options:exampleOptions,
    });
    

    this.andalanChart = new Chart(chartAndalan, {
      type:'pie',
      data:this.andalanData,
      options:exampleOptions,
    });

    this.dribeChart = new Chart(chartDribe, {
      type:'pie',
      data:this.dribeData,
      options:exampleOptions,
    })

    const colasData = {
      labels: ["Dribe", "Andalan", "Nu", "Nukwa"],
      datasets: [
        {
          label: "Uso de colas",
          data: [1, 1, 1, 1],
        }
      ]
    };

    parseOptions(Chart, chartOptions());

    let chartColas = document.getElementById('uso-colas');
    this.colasChart = new Chart(chartColas, {
      type: 'bar',
      options: chartExample2.options,
      data: colasData
    });

    // Fetching data
    this.updateOptions();
    
  }


  public updateOptions() {

    this.colasChart.data.labels = ["Andalan", "Dribe", "Nu", "Nukwa"];
    this.colasChart.update();

    // Fetching data
    this.restService.getResumen(this.clicked).subscribe((data:any) => {
      this.users = data.Usuarios.Total;
      this.hours = data.Horas.Total;
      this.hours = this.hours.match(/^-?\d+(?:\.\d{0,2})?/);
      this.jobs = data.Trabajos.Total;
    })

    this.restService.getQueuePercentage(this.clicked).subscribe((data:any) => {
      // Actualizando los graficos de pastel
      const dataAndalan = [data.andalan.Percentage, data.andalan.Total];
      const dataNu = [data.nu.Percentage, data.nu.Total];
      const dataNukwa = [data.nukwa.Percentage, data.nukwa.Total];
      const dataDribe = [data.dribe.Percentage, data.dribe.Total];

      this.andalanChart.data.datasets[0].data = dataAndalan;
      this.nuChart.data.datasets[0].data = dataNu;
      this.nukwaChart.data.datasets[0].data = dataNukwa;
      this.dribeChart.data.datasets[0].data = dataDribe;

      this.andalanChart.update();
      this.nuChart.update();
      this.nukwaChart.update();
      this.dribeChart.update();

      this.percentage = (((parseFloat(dataAndalan[0])+parseFloat(dataNu[0])+parseFloat(dataNukwa[0])+parseFloat(dataDribe[0]))/400)*100).toFixed(2);

      // Actualizando grafico de barra 
      const arrayColas = [
        {cola:data.andalan.Queue, percentage:parseFloat(data.andalan.Percentage)},
        {cola:data.nukwa.Queue, percentage:parseFloat(data.nukwa.Percentage)},
        {cola:data.dribe.Queue, percentage:parseFloat(data.dribe.Percentage)},
        {cola:data.nu.Queue, percentage:parseFloat(data.nu.Percentage)}
      ];

      arrayColas.sort((a, b) =>-a.percentage+b.percentage);
      this.colasChart.data.labels = arrayColas.map(cola=>cola.cola);
      this.colasChart.data.datasets[0].data = arrayColas.map(cola=>cola.percentage);
      this.colasChart.update();

    }); 
  }

}
