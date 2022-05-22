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
  selector: 'app-dashboard',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public datasets: any;
  public data: any;
  public pieData:any;

  // Datos de los graficos
  public usuariosData;
  public gruposData;
  public trabajosData;

  // Graficos
  public usuariosChart;
  public gruposChart;
  public trabajosChart;  
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

    // Inicializando datos de graficos

    this.usuariosData = {
      labels: ['Red', 'Orange'],
      datasets: [
        {
          label: 'Usuario',
          data:[1,2]
        }
      ],
      backgroundColor: Object.values(CHART_COLORS)
    };

    this.gruposData = {
      labels: ['Red', 'Orange'],
      datasets: [
        {
          label: 'Grupo',
          data:[1,2]
        }
      ],
      backgroundColor: Object.values(CHART_COLORS)
    };

    this.trabajosData = {
      labels: ['Red', 'Orange'],
      datasets: [
        {
          label: 'Usuario',
          data:[1,2]
        }
      ],
      backgroundColor: Object.values(CHART_COLORS)
    };

    parseOptions(Chart, chartOptions());

    let chartUsuarios = document.getElementById('chart-usuarios');
    this.usuariosChart = new Chart(chartUsuarios,{
      type:'bar',
      options: chartExample2.options,
      data: this.usuariosData
    })

    let chartGrupos = document.getElementById('chart-grupos');
    this.gruposChart = new Chart(chartGrupos,{
      type:'bar',
      options:chartExample2.options,
      data: this.gruposData
    })

    let chartTrabajos = document.getElementById('chart-trabajos');
    this.trabajosChart = new Chart(chartTrabajos,{
      type:'bar',
      options:chartExample2.options,
      data: this.trabajosData
    })

    this.updateOptions();
    
  }


  public updateOptions() {

    this.restService.getUserCPU(this.clicked).subscribe((data:any)=>{
      const user = [];
      const horas = [];

      data.forEach((d)=>{
        user.push(d.User);
        horas.push(d.Elapsed);
      });

      user.reverse()
      horas.reverse()

      this.usuariosChart.data.labels = user;
      this.usuariosChart.data.datasets[0].data = horas;

      this.usuariosChart.update();

    });

    this.restService.getGroupCPU(this.clicked).subscribe((data:any)=>{
      const grupos = [];
      const horas = [];

      data.forEach((d)=>{
        grupos.push(d.Group);
        horas.push(d.Elapsed);
      });
      grupos.reverse()
      horas.reverse()

      this.gruposChart.data.labels = grupos;
      this.gruposChart.data.datasets[0].data = horas;

      this.gruposChart.update();

    });

    this.restService.getUserJob(this.clicked).subscribe((data:any)=>{
      const user = [];
      const trabajos = [];

      data.forEach((d)=>{
        user.push(d.User);
        trabajos.push(d.Quantity);
      });
      user.reverse()
      trabajos.reverse()

      this.trabajosChart.data.labels = user;
      this.trabajosChart.data.datasets[0].data = trabajos;

      this.trabajosChart.update();

    });

  }

}
