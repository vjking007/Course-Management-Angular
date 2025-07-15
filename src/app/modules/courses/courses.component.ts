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

  constructor(private courseService: CourseService){ }

  ngOnInit(): void {
     this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe(data => this.courses = data);
  }

  onDelete(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.delete(courseId).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.courseId !== courseId);
          alert('Course deleted successfully!');
        },
        error: () => {
          alert('Failed to delete course.');
        }
      });
    }
  }
}
