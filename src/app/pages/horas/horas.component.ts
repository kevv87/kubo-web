import { Component, OnInit } from '@angular/core';
import { NGB_TIMEPICKER_I18N_FACTORY } from '@ng-bootstrap/ng-bootstrap/timepicker/timepicker-i18n';
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

      // Sorteando las fechas en orden ascendente
      let fechaA, fechaB;
      data = data.sort((a,b)=>{
        fechaA = moment(a.Date,"YYYY-MM-DD");
        fechaB = moment(b.Date, "YYYY-MM-DD");
        if(fechaA.isBefore(fechaB)){
          return 1;
        }else{
          return -1;
        }
      });
      
      data.forEach(d => {
        fechas.push(d.date);
        horas.push(d.hours);
      });

      this.diaChart.data.labels = fechas;
      this.diaChart.data.datasets[0].data = horas;

      this.diaChart.update();

    });

    this.restService.getWeekCPU(this.clicked).subscribe((data:any)=>{
      const orderedWeekDays = ['Lunes','Martes','Mi??rcoles','Jueves','Viernes','S??bado','Domingo'];
      const fechas = []; // Fechas encontradas en el analisis
      const horas = [];
      data.forEach(d => {
        fechas.push(d.weekday);
        horas.push(d.hours);
      });

      let index;
      let tmp1;
      let tmp2;
      orderedWeekDays.forEach((fecha, i)=>{
        // Encontramos el indice de cada dia ordenado en el array de fechas
        index = fechas.findIndex(e=>{
          return e==fecha;
        });
        // Hacemos el swap del valor en index al espacio i
        tmp1 = fechas[i];
        tmp2 = horas[i];
        fechas[i] = fechas[index];
        horas[i] = horas[index];
        fechas[index] = tmp1;
        horas[index] = tmp2;
      });

      this.semanaChart.data.labels = fechas;
      this.semanaChart.data.datasets[0].data = horas;

      this.semanaChart.update(); 
    });

    this.restService.getMonthCPU(this.clicked).subscribe((data:any)=>{
      let fechas = []; // Fechas encontradas en el analisis
      let horas = [];
      const orderedMonths = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      data.forEach(d => {
        fechas.push(d.month);
        horas.push(d.hours);
      });

      let index, tmp1, tmp2;
      orderedMonths.forEach((fecha, i)=>{
        // Encontramos el indice de cada dia ordenado en el array de fechas
        index = fechas.findIndex(e=>{
          return e==fecha;
        });
        if(index!=-1){
          // Hacemos el swap del valor en index al espacio i
          tmp1 = fechas[i];
          tmp2 = horas[i];
          fechas[i] = fechas[index];
          horas[i] = horas[index];
          fechas[index] = tmp1;
          horas[index] = tmp2;
        }
      });
      fechas = fechas.filter(e=>e!==undefined);
      horas = horas.filter(e=>e!==undefined);

      this.mesChart.data.labels = fechas;
      this.mesChart.data.datasets[0].data = horas;

      this.mesChart.update();  
    });

    this.restService.getPartitionCPU(this.clicked).subscribe((data:any)=>{
      const particiones = []; // Fechas encontradas en el analisis
      const horas = [];
      data.forEach(d => {
        particiones.push(d.Partition);
        horas.push(d.Elapsed);
      });

      particiones.reverse();
      horas.reverse();

      this.usoChart.data.labels = particiones;
      this.usoChart.data.datasets[0].data = horas;

      this.usoChart.update();   
    });

    this.restService.getQueueCPU(this.clicked).subscribe((data:any)=>{
      const colas = []; // Fechas encontradas en el analisis
      const horas = [];
      data.forEach(d => {
        colas.push(d.nombreColas);
        horas.push(d.horasUtilizadas);
      });
      
      colas.reverse();
      horas.reverse();

      this.colasChart.data.labels = colas;
      this.colasChart.data.datasets[0].data = horas;

      this.colasChart.update();   
    })

  }

}
