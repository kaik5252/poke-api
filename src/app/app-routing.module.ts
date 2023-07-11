import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViewComponent } from './pages/view/view.component';
import { E404Component } from './pages/e404/e404.component';
import { environment as env } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    title: `${env.appName} - Ínicio`, 
    component: HomeComponent 
  },
  { 
    path: 'view', 
    title: `${env.appName} - Visualizar`, 
    component: ViewComponent 
  },
  { 
    path: '404', 
    title: `${env.appName} - Error 404`, 
    component: E404Component 
  },
  { 
    path: '**', 
    redirectTo: '404', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
