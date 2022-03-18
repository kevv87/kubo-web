import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } 
  from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

import { RestService } from 'src/app/services/rest.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {DebugElement} from '@angular/core';

import {of, throwError} from 'rxjs';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de: DebugElement;
    let element: HTMLElement;
    let restService;
    let routerSpyObj;

    beforeEach(async(() => {
      routerSpyObj = jasmine.createSpyObj('Router', ['navigate'])
      TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [HttpClientTestingModule],
            providers:[
              AuthService,
              RestService,
              {provide: Router, useValue: routerSpyObj} // Aqui usamos un SpyObj porque no nos interesa nada de la implementacion de Router, lo estamos mockeando todo.
            ]
        })
            .compileComponents();
        
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        de = fixture.debugElement;
        element = de.nativeElement;

        restService = fixture.debugElement.injector.get(RestService); 

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a user field', ()=>{
      const userField = de.query(By.css('input#user'));
      expect(userField).toBeTruthy();
    });

    it('should have a password field', ()=>{
      const passwordField = de.query(By.css('input#password'));
      expect(passwordField).toBeTruthy();
    });

    it('should have a login button', ()=>{
      const loginButton = de.query(By.css('button#loginBtn'));
      expect(loginButton).toBeTruthy();
    });

    it('should not redirect when giving wrong credentials', ()=>{
      // Setup 
      component.user = 'prueba';
      component.pass = 'genericPass';
      spyOn(restService, 'login').and.returnValue(throwError({
        status: 401
      }));
      // Test
      component.login();
      // Asserting
      expect(restService.login).toHaveBeenCalledTimes(1);
      expect(routerSpyObj.navigate).not.toHaveBeenCalled();
    });

    it('should redirect when credentials are correct', ()=>{
      // Setup
      component.user = 'prueba';
      component.pass = 'genericPass';
      spyOn(restService, 'login').and.returnValue(of( // Spying on a function and returning a mock value
        {
          status:'ok'
        }
      ));
      spyOn
      // Test
      component.login();
      // Asserting
      expect(restService.login).toHaveBeenCalledTimes(1);
      expect(routerSpyObj.navigate).toHaveBeenCalled();
    });


})
