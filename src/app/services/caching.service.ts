import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  cache:{
    url:string,
    data:any
  }[]=[];


  constructor(
    private httpClient: HttpClient
  ) { }


  getFromCache(url:string):Observable<any>{
    const foundInCache = this.cache.find(entry=>entry.url===url);
    let result:Observable<any>;

    if(foundInCache!=undefined){
      result = new Observable(observer =>{
        observer.next(foundInCache.data);
      });
      console.log('Retrieving from cache!')
    }else{
      return this.callToRest(url).pipe(map(result=>{
        this.cache.push({
          url,
          data:result
        });
        return result;
      }));
    }

    return result;
  }

  callToRest(url:string):Observable<any>{
    return this.httpClient.get(url, httpOptions);
  }

  isInCache(url:string):boolean{
    return this.cache.some(entry=>{
      return entry.url === url
    })
  }

}
