import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { utils } from 'protractor';
import { RestService } from 'src/app/services/rest.service';

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

  // Cantidad de nodos por cola
  nAndalan:number=6;
  nDribe:number=7;
  nNu:number=31;
  nNukwa:number=8;

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
  public percentageHoraData;
  public percentageSemanaData;

  // Charts
  public salesChart;
  public nuChart;
  public nukwaChart;
  public andalanChart;
  public dribeChart;
  public colasChart;
  public percentageHoraChart;
  public percentageSemanaChart;

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
    let chartPercentageSemana = document.getElementById('porcentaje-semana');
    let chartPercentageHora = document.getElementById('porcentaje-hora')

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

    this.percentageHoraData = {
      datasets: [
      {
        label : 'Cola Nu',
        data:[1,0], 
        borderColor:'rgba(255,99,132)',
        backgroundColor: 'rgba(0,0,0,0)' 
      },
      {
        label: 'Cola Nukwa',
        data:[1,0],
        borderColor:'rgba(255,159,64)',
        backgroundColor: 'rgba(0,0,0,0)' 
      },
      {
        label: 'Cola Dribe',
        data:[1,0],
        borderColor:'rgba(255,205,86)',
        backgroundColor: 'rgba(0,0,0,0)' 
      },
      {
        label: 'Cola Andalan',
        data:[1,0],
        borderColor: 'rgba(153,102,255)',
        backgroundColor: 'rgba(0,0,0,0)'
      }
      ]
    }

    this.percentageSemanaData = this.percentageHoraData; 

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

    this.percentageSemanaChart = new Chart(chartPercentageSemana, {
      type:'line',
      data:this.percentageSemanaData,
      options:exampleOptions
    })

    this.percentageHoraChart = new Chart(chartPercentageHora, {
      type:'line',
      data:this.percentageHoraData,
      options:exampleOptions
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
      const dataAndalan = [data.andalan.porcentajeUso, 100-data.andalan.porcentajeUso];
      const dataNu = [data.nu.porcentajeUso, 100-data.nu.porcentajeUso];
      const dataNukwa = [data.nukwa.porcentajeUso, 100-data.nukwa.porcentajeUso];
      const dataDribe = [data.dribe.porcentajeUso, 100-data.dribe.porcentajeUso];

      this.andalanChart.data.datasets[0].data = dataAndalan;
      this.nuChart.data.datasets[0].data = dataNu;
      this.nukwaChart.data.datasets[0].data = dataNukwa;
      this.dribeChart.data.datasets[0].data = dataDribe;

      this.andalanChart.update();
      this.nuChart.update();
      this.nukwaChart.update();
      this.dribeChart.update();

      this.percentage = 
        (((
          parseFloat(dataAndalan[0])*this.nAndalan+
          parseFloat(dataNu[0])*this.nNu+
          parseFloat(dataNukwa[0])*this.nNukwa+
          parseFloat(dataDribe[0])*this.nDribe)
         /(this.nNu+this.nAndalan+this.nDribe+this.nNukwa))).toFixed(2);

      // Actualizando grafico de barra 
      const arrayColas = [
        {cola:data.andalan.nombreColas, percentage:parseFloat(data.andalan.porcentajeUso)},
        {cola:data.nukwa.nombreColas, percentage:parseFloat(data.nukwa.porcentajeUso)},
        {cola:data.dribe.nombreColas, percentage:parseFloat(data.dribe.porcentajeUso)},
        {cola:data.nu.nombreColas, percentage:parseFloat(data.nu.porcentajeUso)}
      ];

      arrayColas.sort((a, b) =>-a.percentage+b.percentage);
      this.colasChart.data.labels = arrayColas.map(cola=>cola.cola);
      this.colasChart.data.datasets[0].data = arrayColas.map(cola=>cola.percentage);
      this.colasChart.update();

    }); 

    const nombreColas = ['nu','nukwa','dribe', 'andalan'];
    nombreColas.forEach((cola, indexCola)=>{

      this.restService.getWeekPercentage(this.clicked,cola).subscribe((data:any)=>{
        const percentageArray = [];  
        const orderedWeekDays = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
        const weekDays = [];

        data.forEach(entry=>{
          weekDays.push(entry.weekday);
          const porcentaje = entry.porcentajeUtilizacion;
          porcentaje > 100 ? percentageArray.push(100):percentageArray.push(porcentaje);
        });

        orderedWeekDays.forEach((fecha, i)=>{
          let tmp1, tmp2, index;
          // Encontramos el indice de cada dia ordenado en el array de fechas
          index = weekDays.findIndex(e=>{
            return e==fecha;
          });
          // Hacemos el swap del valor en index al espacio i
          tmp1 = weekDays[i];
          tmp2 = percentageArray[i];
          weekDays[i] = weekDays[index];
          percentageArray[i] = percentageArray[index];
          weekDays[index] = tmp1;
          percentageArray[index] = tmp2;
        });

        this.percentageSemanaData.datasets[indexCola].data = percentageArray;
        this.percentageSemanaData.labels = weekDays;
        this.percentageSemanaChart.update();
      });

      this.restService.getHourPercentage(this.clicked,cola).subscribe((data:any)=>{
        const hours = [];
        const percentageArray = [];

        data.forEach(entry=>{
          const porcentaje = entry.porcentajeUtilizacion;
          porcentaje > 100 ? percentageArray.push(100):percentageArray.push(porcentaje);
        });

        this.percentageHoraData.datasets[indexCola].data = percentageArray;
        this.percentageHoraData.labels = hours;
        this.percentageHoraChart.update();

      })

    })

  }

}
