import { Component, OnInit } from '@angular/core';
import {Course} from './models/course.model';
import { CourseService } from './services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(private course: CourseService){ }

  ngOnInit(): void {
    console.log('Hey');
    this.loadCourses();
  }

  loadCourses(): void {
    this.course.getAll().subscribe(data => this.courses = data);
  }
}
