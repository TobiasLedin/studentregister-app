import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm, } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = 'Modal title';
  @Input() purpose: 'new' | 'edit' | 'delete' = 'new';
  @Input() studentData?: Student;
  @Output() close = new EventEmitter<void>();
  @Output() actionConfirmed = new EventEmitter<any>();
  @ViewChild('studentForm') studentForm?: NgForm;

  dateToday: string;

  constructor() {
    this.dateToday = new Date().toISOString().split('T')[0];
  }

  closeModal(): void {
    this.close.emit();
  }

  confirmAction(): void {
    this.actionConfirmed.emit(this.studentData);
    this.closeModal();
  }
}
