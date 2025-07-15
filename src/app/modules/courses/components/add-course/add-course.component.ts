import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit(): void {
    this.courseForm=this.fb.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['']
    })
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const newCourse: Course = this.courseForm.value;

      this.courseService.create(newCourse).subscribe({
        next: (createdCourse) => {
          console.log('Course created:', createdCourse);

          // ✅ Reset form
          this.courseForm.reset();

          // ✅ Navigate or show message
          alert('Course created successfully!');
          this.router.navigate(['/admin/courses']);
        },
        error: (err) => {
          console.error('Error creating course:', err);
          alert('Something went wrong while creating course.');
        }
      });

    } else {
      this.courseForm.markAllAsTouched();
    }
  }
}
