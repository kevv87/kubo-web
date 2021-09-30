import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }

  getResumen(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/resumen/'+period, httpOptions);
  }

  getDateCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/dateCPU/'+period, httpOptions);
  }

  getDateJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/dateJob/'+period, httpOptions);
  }
  getGroupCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/groupCPU/'+period, httpOptions);
  }
  getHourJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/hourJob/'+period, httpOptions);
  }
  getMonthCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/monthCPU/'+period, httpOptions);
  }
  getNodeJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/nodeJob/'+period, httpOptions);
  }
  getPartitionCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/partitionCPU/'+period, httpOptions);
  }
  getQueueCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/queueCPU/'+period, httpOptions);
  }
  getQueuePercentage(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/queuePercentage/'+period, httpOptions);
  }
  getSubmitJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/submitJob/'+period, httpOptions);
  }
  getTimeJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/timeJob/'+period, httpOptions);
  }
  getUserCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/userCPU/'+period, httpOptions);
  }
  getUserJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/userJob/'+period, httpOptions);
  }
  getWeekCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/weekCPU/'+period, httpOptions);
  }
  getWeekJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get('http://127.0.0.1:5000/weekJob/'+period, httpOptions);
  }

}
