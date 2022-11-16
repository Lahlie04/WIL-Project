import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentSiteComponent } from './components/student-site/student-site.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'student', component: StudentSiteComponent},
  {path: 'dashboard', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
