import { NgModule, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pag/home/home.component';
import { ViewComponent } from './pag/view/view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view/:id', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
