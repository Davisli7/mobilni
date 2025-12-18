import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
  IonLabel, IonCheckbox, IonIcon, IonFabButton, IonFab, IonCard } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonCard, IonFab, IonFabButton, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
    IonLabel, IonCheckbox, IonIcon,
    CommonModule
  ],
  standalone: true
})
export class Tab1Page {
  activeTodos = this.todoService.activeTodos;

  constructor(
    private modalCtrl: ModalController,
    private todoService: TodoService
  ) {}

  // Helper pro bezpečné zobrazení data
  formatDueDate(dueDate: string | null): string {
    if (!dueDate) return '';
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) return ''; // Invalid date
    return date.toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: TodoModalComponent,
      componentProps: { title: 'Nový úkol' },
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      handle: false,
      backdropDismiss: true
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.todoService.addTodo(data.text, data.notes, data.dueDate);
    }
  }

  async openEditModal(todo: any) {
    const modal = await this.modalCtrl.create({
      component: TodoModalComponent,
      componentProps: {
        title: 'Upravit úkol',
        todo: { text: todo.text, notes: todo.notes, dueDate: todo.dueDate }
      },
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      handle: false,
      backdropDismiss: true
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.todoService.updateTodo(todo.id, data.text, data.notes, data.dueDate);
    }
  }

  toggleComplete(id: number) {
    this.todoService.toggleComplete(id);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}