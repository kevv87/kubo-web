import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CachingService } from './caching.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private url:string=environment.url;

  constructor(
    private http:HttpClient,
    private cachingService:CachingService
  ) { }

  login(user:string, pass:string){
    return this.http.post(this.url+'/login', {user:user, password:pass});
  }

  getResumen(mes=false){
    const period = mes?'mes':'year';
    /*return this.cachingService.getFromCache(this.url+'/resumen/'+period);*/
    return this.cachingService.getFromCache(this.url+'/resumen/'+period);
  }

  getDateCPU(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/dateCPU/'+period);
  }

  getDateJob(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/dateJob/'+period);
  }
  getGroupCPU(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/groupCPU/'+period);
  }
  getHourJob(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/hourJob/'+period);
  }
  getMonthCPU(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/monthCPU/'+period);
  }
  getNodeJob(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/nodeJob/'+period);
  }
  getPartitionCPU(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/partitionCPU/'+period);
  }
  getQueueCPU(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/queueCPU/'+period);
  }
  getQueuePercentage(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/queuePercentage/'+period);
  }
  getSubmitJob(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/submitJob/'+period);
  }
  getTimeJob(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/timeJob/'+period);
  }
  getUserCPU(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/userCPU/'+period);
  }
  getUserJob(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/userJob/'+period);
  }
  getWeekCPU(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/weekCPU/'+period);
  }
  getWeekJob(mes=false){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/weekJob/'+period);
  }

  getWeekPercentage(mes=false, cola:string){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/weekPercentage/'+period+'/'+cola);
  }

  getHourPercentage(mes=false, cola:string){
    const period = mes?'mes':'year';
    return this.cachingService.getFromCache(this.url+'/horaPercentage/'+period+'/'+cola);
  }

}
