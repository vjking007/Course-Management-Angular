import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [{ path: '', component: CoursesComponent },
{ path: 'add', component: AddCourseComponent },
// { path: 'edit/:id', component: CourseFormComponent },
// { path: 'view/:id', component: CourseDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
