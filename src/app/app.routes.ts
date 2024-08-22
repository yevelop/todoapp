import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component'
import { NavComponent } from './pages/home/nav/nav.component';

export const routes: Routes = [

{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'tasks', component: HomeComponent }, 
{ path: 'labs',component: LabsComponent },

{ path: 'completed',component: LabsComponent },
{ path: 'nav', component: NavComponent}
];
