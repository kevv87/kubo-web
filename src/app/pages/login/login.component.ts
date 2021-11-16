import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public user;
  public pass;

  constructor(
    private restService: RestService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login(){
    this.restService.login(this.user, this.pass).subscribe((data)=>{
      console.log(data);
      this.authService.setLoggedIn(true);
      this.router.navigate(['/#/dashboard']);
    }, err=>{
      console.log(err);
    });
  }

}
