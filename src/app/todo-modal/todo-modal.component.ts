import { Component, Input } from '@angular/core';
import { ModalController,
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonTextarea,
  IonButton, IonButtons, IonIcon
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerService } from './../services/date-picker.service';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonTextarea,
    IonButton, IonButtons, IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class TodoModalComponent {
  @Input() title: string = 'Nový úkol';
  @Input() todo: { text: string; notes: string; dueDate: string | null } | null = null;

  text: string = '';
  notes: string = '';
  dueDate: string | null = null;
  dueDateDisplay: string = '';

  constructor(
    private modalCtrl: ModalController,
    private datePickerService: DatePickerService
  ) {}

  ngOnInit() {
    if (this.todo) {
      this.text = this.todo.text;
      this.notes = this.todo.notes || '';
      this.dueDate = this.todo.dueDate;
      this.updateDisplayDate();
    }
  }

  async openDatePicker() {
    const result = await this.datePickerService.pickDate(this.dueDate || undefined);
    if (result) {
      this.dueDate = result;
      this.updateDisplayDate();
    }
  }

  clearDate() {
    this.dueDate = null;
    this.dueDateDisplay = '';
  }

  private updateDisplayDate() {
    if (this.dueDate) {
      const date = new Date(this.dueDate);
      this.dueDateDisplay = date.toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else {
      this.dueDateDisplay = '';
    }
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.text.trim()) {
      this.modalCtrl.dismiss({
        text: this.text.trim(),
        notes: this.notes.trim(),
        dueDate: this.dueDate
      }, 'confirm');
    }
  }
}