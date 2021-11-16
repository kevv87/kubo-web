import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private url:string='http://127.0.0.1:5000';

  constructor(private http:HttpClient) { }

  login(user:string, pass:string){
    return this.http.post(this.url+'/login', {user:user, password:pass});
  }

  getResumen(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/resumen/'+period, httpOptions);
  }

  getDateCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/dateCPU/'+period, httpOptions);
  }

  getDateJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/dateJob/'+period, httpOptions);
  }
  getGroupCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/groupCPU/'+period, httpOptions);
  }
  getHourJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/hourJob/'+period, httpOptions);
  }
  getMonthCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/monthCPU/'+period, httpOptions);
  }
  getNodeJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/nodeJob/'+period, httpOptions);
  }
  getPartitionCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/partitionCPU/'+period, httpOptions);
  }
  getQueueCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/queueCPU/'+period, httpOptions);
  }
  getQueuePercentage(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/queuePercentage/'+period, httpOptions);
  }
  getSubmitJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/submitJob/'+period, httpOptions);
  }
  getTimeJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/timeJob/'+period, httpOptions);
  }
  getUserCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/userCPU/'+period, httpOptions);
  }
  getUserJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/userJob/'+period, httpOptions);
  }
  getWeekCPU(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/weekCPU/'+period, httpOptions);
  }
  getWeekJob(mes=false){
    const period = mes?'mes':'year';
    return this.http.get(this.url+'/weekJob/'+period, httpOptions);
  }

}
