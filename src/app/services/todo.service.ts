import { Injectable, signal, computed } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  notes: string;
  dueDate: string | null;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([]);
  private nextId = signal<number>(1);

  activeTodos = computed(() => this.todos().filter(t => !t.completed));
  completedTodos = computed(() => this.todos().filter(t => t.completed));

  constructor() {
    this.loadFromStorage();
  }

  addTodo(text: string, notes: string, dueDate: string | null = null) {
    this.todos.update(current => [
      ...current,
      {
        id: this.nextId(),
        text: text.trim(),
        notes: notes.trim(),
        dueDate,
        completed: false
      }
    ]);
    this.nextId.update(n => n + 1);
    this.saveToStorage();
  }

  updateTodo(id: number, text: string, notes: string, dueDate: string | null = null) {
    this.todos.update(current =>
      current.map(t => (t.id === id ? { ...t, text: text.trim(), notes: notes.trim(), dueDate } : t))
    );
    this.saveToStorage();
  }

  toggleComplete(id: number) {
    this.todos.update(current =>
      current.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    this.saveToStorage();
  }

  deleteTodo(id: number) {
    this.todos.update(current => current.filter(t => t.id !== id));
    this.saveToStorage();
  }

  private loadFromStorage() {
    const saved = localStorage.getItem('todos');
    if (saved) {
      const loaded: Todo[] = JSON.parse(saved);
      this.todos.set(loaded);
      if (loaded.length > 0) {
        this.nextId.set(Math.max(...loaded.map(t => t.id)) + 1);
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos()));
  }
}