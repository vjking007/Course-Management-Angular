import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'admin', loadChildren: () => import('./layout/dashboard-layout/dashboard-layout.module').then(m => m.DashboardLayoutModule)},
{ path: '', redirectTo: 'admin', pathMatch: 'full' },
{ path: '**', redirectTo: 'admin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
