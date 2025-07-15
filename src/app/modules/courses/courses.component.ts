import { Component, OnInit } from '@angular/core';
import {Course} from './models/course.model';
import { CourseService } from './services/course.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  dataSource = new MatTableDataSource<Course>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private courseService: CourseService){ }

  ngOnInit(): void {
     this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe(courses => {
      this.dataSource.data = courses;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

       //Custom filter logic
    // ✅ Custom filter logic
    this.dataSource.filterPredicate = (data: Course, filter: string): boolean => {
      const filterValue = filter.trim().toLowerCase();

      const name = data.courseName?.toLowerCase() || '';
      const desc = data.description?.toLowerCase() || '';
      const startDate = new Date(data.startDate).toLocaleDateString('en-US'); // e.g. 7/15/2025
      const duration = data.duration?.toString() || '';

      return (
        name.includes(filterValue) ||
        desc.includes(filterValue) ||
        startDate.includes(filterValue) ||
        duration.includes(filterValue)
      );
    };
    });
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
