import { Component, inject, OnInit } from '@angular/core';
import { Student, StudentService } from './student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  studentService = inject(StudentService);

  dataLoaded: boolean = false;
  studentList: Student[] = [];

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.dataLoaded = false;
    this.studentService.getStudents().subscribe((result: Student[]) => {
      this.studentList = result;
      this.dataLoaded = true;
    })
  }


}
