import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
{ path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
{ path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./layout/dashboard-layout/dashboard-layout.module').then(m => m.DashboardLayoutModule)},
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
