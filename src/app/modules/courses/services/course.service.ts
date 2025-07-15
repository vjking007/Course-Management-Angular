import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://localhost:8082/api/v1/courses';

  constructor(private http: HttpClient){ }

  getAll(): Observable<Course[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => response.data.content as Course[])
      );
  }

  // getById(id: number): Observable<Course> {
  //   return this.http.get<Course>(`${this.baseUrl}/${id}`);
  // }

  create(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course);
  }

  // update(id: number, course: Course): Observable<Course> {
  //   return this.http.put<Course>(`${this.baseUrl}/${id}`, course);
  // }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
