import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MyBarChartComponent } from './pages/my-bar-chart/my-bar-chart.component';
import { PagenofouundComponent } from './pages/pagenofouund/pagenofouund.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'chart', component: MyBarChartComponent
  },
  {
    path: '**', component: PagenofouundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
