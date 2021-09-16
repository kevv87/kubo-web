import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { HorasComponent } from 'src/app/pages/horas/horas.component';
import { TrabajosComponent } from 'src/app/pages/trabajos/trabajos.component';
import { UsuariosComponent } from 'src/app/pages/usuarios/usuarios.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'trabajos',       component: TrabajosComponent },
    { path: 'horas',          component: HorasComponent },
    { path: 'usuarios',       component: UsuariosComponent}
];
