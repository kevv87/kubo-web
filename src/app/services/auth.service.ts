import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn:boolean=false;

  constructor() { }

  setLoggedIn(value:boolean){
    this.isLoggedIn=value;
  }

}
