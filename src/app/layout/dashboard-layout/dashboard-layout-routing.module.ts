import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';

const routes: Routes = [
{path: '', component: DashboardLayoutComponent, children: [
    {
      path: 'courses',
      loadChildren: () =>
        import('../../modules/courses/courses.module').then(m => m.CoursesModule)
    },
    {
      path: '',
      redirectTo: '/admin/courses',
      pathMatch: 'full'
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLayoutRoutingModule { }
