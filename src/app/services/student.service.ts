import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  private apiUrl = "https://studentregisterapi-app-202501081.purpleforest-03aa017a.northeurope.azurecontainerapps.io/api/students";
  //private apiUrl = "https://localhost:7094/api/students";

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiUrl + '/' + id);
  }

  createStudent(student: Student) {
    return this.http.post<Student>(this.apiUrl, student)
  }

  editStudent(id: number, student: Student) {
    return this.http.put<Student>(this.apiUrl + '/' + id, student)
  }

  deleteStudent(id: number) {
    return this.http.delete(this.apiUrl + '/' + id)
  }
}

