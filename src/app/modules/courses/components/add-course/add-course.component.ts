import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseForm!: FormGroup;
  isEditMode = false;
  courseId!: number;

  constructor(private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseForm=this.fb.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['']
    });
    
    //Check if edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.courseId = +id;
        this.loadCourse(this.courseId);
      }
    });
  }

  loadCourse(id: number): void {
    this.courseService.getById(id).subscribe(course => {
      // Convert string date to Date object if needed
      const patchData = {
        ...course,
        // Convert string → Date (only if value exists)
        startDate: course.startDate ? new Date(course.startDate) : null,
        endDate: course.endDate ? new Date(course.endDate) : null
      };
  
      this.courseForm.patchValue(patchData);
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const course: Course = this.courseForm.value;

      if (this.isEditMode) {
        this.courseService.update(this.courseId, course).subscribe(() => {
          alert('Course updated!');
          this.router.navigate(['/admin/courses']);
        });
      } 
      else {
      this.courseService.create(course).subscribe({
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
    }

    } else {
      this.courseForm.markAllAsTouched();
    }
  }
}
