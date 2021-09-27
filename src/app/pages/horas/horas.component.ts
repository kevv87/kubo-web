import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { RestService } from 'src/app/services/rest.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-horas',
  templateUrl: './horas.component.html',
  styleUrls: ['./horas.component.scss']
})
export class HorasComponent implements OnInit {

  public datasets: any;
  public data: any;
  public pieData:any;

  // Data for the charts
  public diaData;
  public semanaData;
  public mesData;
  public usoData;
  public colasData;

  // Charts
  public diaChart;
  public semanaChart;
  public mesChart;
  public usoChart;
  public colasChart;


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

    parseOptions(Chart, chartOptions());

    let chartColas = document.getElementById('chart-colas');
    let chartSemana = document.getElementById('chart-semana');
    let chartMes = document.getElementById('chart-mes');
    let chartDia = document.getElementById('chart-dia');
    let chartUso = document.getElementById('chart-uso');

    // Inicializando graficos
    this.diaData = {
      labels:['dd/mm1','dd/mm2'],
      datasets: [
        { 
          label:'Data',
          data:[1,2]
        }
      ],
      backgroundColor: Object.values(CHART_COLORS)
    };

    this.semanaData = {
      labels:['dd/mm1','dd/mm2'],
      datasets: [
        { 
          label:'Data',
          data:[1,2]
        }
      ],
      backgroundColor: Object.values(CHART_COLORS)
    };

    this.mesData = {
      labels:['dd/mm1','dd/mm2'],
      datasets: [
        { 
          label:'Data',
          data:[1,2]
        }
      ],
      backgroundColor: Object.values(CHART_COLORS)
    };
    
    this.usoData = {
      labels:['dd/mm1','dd/mm2'],
      datasets: [
        { 
          label:'Data',
          data:[1,2]
        }
      ],
      backgroundColor: Object.values(CHART_COLORS)
    };

    this.colasData = {
      labels:['dd/mm1','dd/mm2'],
      datasets: [
        { 
          label:'Data',
          data:[1,2]
        }
      ],
      backgroundColor: Object.values(CHART_COLORS)
    };

    this.colasChart = new Chart(chartColas,{
      type:'bar',
      options: chartExample2.options,
      data: this.colasData
    })

    
    this.semanaChart = new Chart(chartSemana,{
      type:'bar',
      options:chartExample2.options,
      data: this.semanaData
    })

    
    this.mesChart = new Chart(chartMes,{
      type:'bar',
      options:chartExample2.options,
      data: this.mesData
    })
    
    this.diaChart = new Chart(chartDia,{
      type:'bar',
      options:chartExample2.options,
      data: this.diaData
    });

    this.usoChart = new Chart(chartUso,{
      type:'bar',
      options: chartExample2.options,
      data: this.usoData
    })

    this.updateOptions();
    
  }


  public updateOptions() {
    this.restService.getDateCPU(this.clicked).subscribe((data:any) => {
      
      const fechas = []; // Fechas encontradas en el analisis
      const horas = [];
      data.forEach(d => {
        fechas.push(d.Date);
        horas.push(d.Hours);
      });


      this.diaChart.data.labels = fechas;
      this.diaChart.data.datasets[0].data = horas;

      this.diaChart.update();

    });

    this.restService.getWeekCPU(this.clicked).subscribe((data:any)=>{
      const fechas = []; // Fechas encontradas en el analisis
      const horas = [];
      data.forEach(d => {
        fechas.push(d.Date);
        horas.push(d.Hours);
      });

      this.semanaChart.data.labels = fechas;
      this.semanaChart.data.datasets[0].data = horas;

      this.semanaChart.update(); 
    });

    this.restService.getMonthCPU(this.clicked).subscribe((data:any)=>{
      const fechas = []; // Fechas encontradas en el analisis
      const horas = [];
      data.forEach(d => {
        fechas.push(d.Date);
        horas.push(d.Hours);
      });

      this.mesChart.data.labels = fechas;
      this.mesChart.data.datasets[0].data = horas;

      this.mesChart.update();  
    });

    this.restService.getPartitionCPU(this.clicked).subscribe((data:any)=>{
      const particiones = []; // Fechas encontradas en el analisis
      const horas = [];
      data.forEach(d => {
        particiones.push(d.Partition);
        horas.push(d.Hours);
      });

      this.usoChart.data.labels = particiones;
      this.usoChart.data.datasets[0].data = horas;

      this.usoChart.update();   
    });

    this.restService.getQueueCPU(this.clicked).subscribe((data:any)=>{
      const colas = []; // Fechas encontradas en el analisis
      const horas = [];
      data.forEach(d => {
        colas.push(d.Queue);
        horas.push(d.Hours);
      });

      this.colasChart.data.labels = colas;
      this.colasChart.data.datasets[0].data = horas;

      this.colasChart.update();   
    })

  }

}
