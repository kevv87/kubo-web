import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/horas', title: 'Horas de cómputo',  icon:'ni-watch-time text-blue', class: '' },
    { path: '/trabajos', title: 'Trabajos',  icon:'ni-archive-2 text-orange', class: '' },
    { path: '/usuarios', title: 'Usuarios',  icon:'ni-single-02 text-yellow', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout(){
    this.authService.setLoggedIn(false);
    this.router.navigateByUrl('/auth');
  }
}
