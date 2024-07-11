import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent}, // to create a routing module for logincomponent
  {path: 'signup', component: SignupComponent},
  {path:'dashboard', component: DashboardComponent}
  // above login & signup routes will import automatically.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
