import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
  IonLabel, IonIcon, IonCard } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonCard, 
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption,
    IonLabel, IonIcon,
    CommonModule
  ],
  standalone: true
})
export class Tab2Page {
  completedTodos = this.todoService.completedTodos;

  constructor(private todoService: TodoService) {}

  formatDueDate(dueDate: string | null): string {
    if (!dueDate) return '';
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) return ''; 
    return date.toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}