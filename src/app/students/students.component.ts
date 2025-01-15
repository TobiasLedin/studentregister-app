import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ModalComponent } from "./modal/modal.component";
import { Student } from '../interfaces/student.interface';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  studentService = inject(StudentService);

  dataLoaded: boolean = false;
  studentList: Student[] = [];

  // Modal 
  isModalVisible = false;
  modalTitle: string = '';
  modalPurpose: 'new' | 'edit' | 'delete' = 'new';
  selectedStudent?: Student;
  selectedStudentId?: number;


  ngOnInit(): void {
    this.isModalVisible = false;
    this.getAllStudents();
  }

  getAllStudents() {
    this.dataLoaded = false;
    this.studentService.getAllStudents().subscribe((result: Student[]) => {
      this.studentList = result;
      this.dataLoaded = true;
    })
  }


  showModal(purpose: 'new' | 'edit' | 'delete', student?: Student) {
    this.isModalVisible = true;
    this.modalPurpose = purpose;

    if (purpose === 'new') {
      this.modalTitle = 'Add new student';
      this.selectedStudent = {
        studentId: 0,
        firstName: '',
        lastName: '',
        dateOfBirth: new Date(),
        email: ''
      } as Student;
    }
    else if (purpose === 'edit') {
      this.modalTitle = 'Edit student details';
      this.selectedStudent = {
        studentId: Number(student?.studentId),
        firstName: student?.firstName ?? '',
        lastName: student?.lastName ?? '',
        dateOfBirth: student?.dateOfBirth ?? new Date(),
        email: student?.email ?? ''
      };
    }
    else if (purpose === 'delete') {
      this.modalTitle = 'Confirm deletion';
      this.selectedStudent = {
        studentId: Number(student?.studentId),
        firstName: student?.firstName ?? '',
        lastName: student?.lastName ?? '',
        dateOfBirth: student?.dateOfBirth ?? new Date(),
        email: student?.email ?? ''
      };
    }
  }

  hideModal() {
    this.isModalVisible = false;
  }

  onActionConfirmed(student: Student) {
    if (this.modalPurpose === 'new') {
        // Call student service to create new student
        this.studentService.createStudent(student).subscribe(() => {
            this.getAllStudents();
            this.hideModal();
        });
    } else if (this.modalPurpose === 'edit') {
        // Call student service to edit student
        this.studentService.editStudent(student.studentId, student).subscribe(() => {
            this.getAllStudents();
            this.selectedStudent = undefined;
            this.selectedStudentId = undefined;
            this.hideModal();
        });
    } else if (this.modalPurpose === 'delete') {
        // Call student service to delete student
        this.studentService.deleteStudent(student.studentId).subscribe(() => {
            this.getAllStudents();
            this.selectedStudent = undefined;
            this.selectedStudentId = undefined;
            this.hideModal();
        });
    }
}

  selectStudent(student: Student): void {
    if (this.selectedStudentId === student.studentId) {
      this.selectedStudentId = undefined;
      this.selectedStudent = undefined;
    } 
    else {
      this.selectedStudentId = student.studentId;
      this.selectedStudent = student;
    }
  }

}
