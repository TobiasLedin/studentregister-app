import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  private apiUrl = "https://studentregisterapi-app-202501081.purpleforest-03aa017a.northeurope.azurecontainerapps.io/api/students";
  //private apiUrl = "https://localhost:7094/api/students";

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiUrl+'/'+id);
  }

  createStudent(student: Student) {
    return this.http.post<Student>(this.apiUrl, student)
  }

  deleteStudent(id: number) {
    return this.http.delete(this.apiUrl+'/'+id)
  }
}

export interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
}

