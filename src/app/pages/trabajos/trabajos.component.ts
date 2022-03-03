import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { RestService } from 'src/app/services/rest.service';
import * as moment from 'moment';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.scss']
})
export class TrabajosComponent implements OnInit {

  public datasets: any;
  public data: any;
  public pieData:any;

  //Data for the charts
  public diaData;
  public semanaData;
  public inicioData;
  public envioData;
  public duracionData;
  public rankingData;

  // Charts
  public diaChart;
  public semanaChart;
  public inicioChart;
  public envioChart;
  public duracionChart;
  public rankingChart;

  // Variables de control
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

    this.data = this.datasets[0];

    // Inicializando gráficos
    this.diaData = {
      labels:['dd/mm1','dd/mm2'],
      datasets:[
        {
          label:'Trabajos del día',
          data:[1,2]
        }
      ]
    };

    this.inicioData = {
      labels:['dd/mm1','dd/mm2'],
      datasets:[
        {
          label:'Hora de inicio de trabajos',
          data:[1,2]
        }
      ]
    }; 

    this.semanaData = {
      labels:['dd/mm1','dd/mm2'],
      datasets:[
        {
          label:'Trabajos enviados',
          data:[1,2]
        }
      ]
    };

    this.diaData = {
      labels:['dd/mm1','dd/mm2'],
      datasets:[
        {
          label:'Trabajos enviados',
          data:[1,2]
        }
      ]
    }; 

    this.envioData = {
      labels:['dd/mm1','dd/mm2'],
      datasets:[
        {
          label:'Hora de envio',
          data:[1,2]
        }
      ]
    };

    this.rankingData = {
      labels:['dd/mm1','dd/mm2'],
      datasets:[
        {
          label:'Hora de envio',
          data:[1,2]
        }
      ]
    };

    this.duracionData = {
      labels:['dd/mm1','dd/mm2'],
      datasets:[
        {
          label:'Trabajos del usuario',
          data:[1,2]
        }
      ]
    };

    parseOptions(Chart, chartOptions());

    let chartInicio = document.getElementById('chart-inicio');
    this.inicioChart = new Chart(chartInicio, {
      type:'bar',
      options: chartExample2.options,
      data: this.inicioData
    })

    let chartSemana = document.getElementById('chart-semana');
    this.semanaChart = new Chart(chartSemana,{
      type:'bar',
      options:chartExample2.options,
      data: this.semanaData
    })

    let chartDia = document.getElementById('chart-dia');
    this.diaChart = new Chart(chartDia,{
      type:'bar',
      options:chartExample2.options,
      data: this.diaData
    })

    let chartEnvio = document.getElementById('chart-envio');
    this.envioChart = new Chart(chartEnvio,{
      type:'bar',
      options:chartExample2.options,
      data: this.envioData
    })

    let chartRanking = document.getElementById('chart-ranking');
    this.rankingChart = new Chart(chartRanking,{
      type:'bar',
      options:chartExample2.options,
      data: this.rankingData
    })

    let chartDuracion = document.getElementById('chart-duracion');
    this.duracionChart = new Chart(chartDuracion,{
      type:'bar',
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart'
          }
        }
      },
      data: this.duracionData
    });

    this.updateOptions();

    
  }


  public updateOptions() {

    this.restService.getTimeJob(this.clicked).subscribe((data:any)=>{
      const horas = [];
      const trabajos = [];

      data.forEach((d)=>{
        horas.push(d.Elapsed);
        trabajos.push(d.Quantity);
      });

      this.duracionChart.data.labels = horas;
      this.duracionChart.data.datasets[0].data = trabajos;

      this.duracionChart.update();

    });

    this.restService.getWeekJob(this.clicked).subscribe((data:any)=>{

      const dias = [];
      const trabajos = [];
      const orderedWeekDays = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

      data.forEach((d)=>{
        dias.push(d.weekday);
        trabajos.push(d.startedJobs);
      });

      let index;
      let tmp1;
      let tmp2;
      orderedWeekDays.forEach((fecha, i)=>{
        // Encontramos el indice de cada dia ordenado en el array de fechas
        index = dias.findIndex(e=>{
          return e==fecha;
        });
        // Hacemos el swap del valor en index al espacio i
        tmp1 = dias[i];
        tmp2 = trabajos[i];
        dias[i] = dias[index];
        trabajos[i] = trabajos[index];
        dias[index] = tmp1;
        trabajos[index] = tmp2;
      });

      this.semanaChart.data.labels = dias;
      this.semanaChart.data.datasets[0].data = trabajos;

      this.semanaChart.update();

    });

    this.restService.getDateJob(this.clicked).subscribe((data:any)=>{
      const fechas = [];
      const trabajos = [];

      // Sorteando las fechas en orden ascendente
      let fechaA, fechaB;

      data.sort((a,b)=>{
        fechaA = moment(a.date,"YYYY-MM-DD");
        fechaB = moment(b.date, "YYYY-MM-DD");
        if(fechaA.isBefore(fechaB)){
          return -1;
        }else{
          return 1;
        }
      });

      data.forEach((d)=>{
        fechas.push(d.date);
        trabajos.push(d.startedJobs);
      });

      this.diaChart.data.labels = fechas;
      this.diaChart.data.datasets[0].data = trabajos;

      this.diaChart.update();

    });

    this.restService.getSubmitJob(this.clicked).subscribe((data:any)=>{
      const horas = [];
      const trabajos = [];

      data.forEach((d)=>{
        horas.push(d.hour);
        trabajos.push(d.sentJobs);
      });

      this.envioChart.data.labels = horas;
      this.envioChart.data.datasets[0].data = trabajos;

      this.envioChart.update();
    });

    this.restService.getNodeJob(this.clicked).subscribe((data:any)=>{
      let nodos = [];
      let trabajos = [];

      data = data.sort((a, b) =>{
        if(parseInt(a.Nodes) < parseInt(b.Nodes)){
          return -1;
        }else{
          return 1;
        }
      })

      data.forEach((d)=>{
        nodos.push(d.NNodes);
        trabajos.push(d.Cant);
      });
      
      nodos = nodos.reverse();
      trabajos = trabajos.reverse();

      this.rankingChart.data.labels = nodos;
      this.rankingChart.data.datasets[0].data = trabajos;
      
      this.rankingChart.update();
    });

    this.restService.getHourJob(this.clicked).subscribe((data:any)=>{

      const hours = [];
      const trabajos = []; 

      data.forEach((d)=>{
        hours.push(d.hour);
        trabajos.push(d.startedJobs);
      });

      this.inicioChart.data.labels = hours;
      this.inicioChart.data.datasets[0].data = trabajos;

      this.inicioChart.update();

    });

  }

}
