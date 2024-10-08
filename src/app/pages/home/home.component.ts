import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Task} from '../../models/task.model'
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ReactiveFormsModule]
})
export class HomeComponent {
  // Lista de tareas
  tasks = signal<Task[]>([]);

  injector = inject(Injector);

ngOnInit() {
    // Cargar las tareas guardadas en localStorage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks.set(JSON.parse(savedTasks));
    }
    this.tackTask();
  }

  tackTask(){
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, {injector: this.injector} );
  }

  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ],
  })
  filter = signal(<'all' | 'pending' | 'completed'>('all')); // Filtro de tareas

  // Estado compuesto: combinación de los estados de las tareas y el filtro
  // para derivar un nuevo estado basado en el filtro actual.
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  })


  // Manejador de cambio de input
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    // Agregar una nueva tarea
    this.addTask(newTask);
  }

  changeHandlerForm() {

    if (this.newTaskControl.valid) {
      const newTask = this.newTaskControl.value.trim();
      if (newTask != '') {
        this.addTask(newTask);
        this.newTaskControl.reset();
      }
    }

  }

  // Agregar una tarea a la lista
  addTask(title: string) {
    const newTask: Task = {
      id: new Date(Date.now()),
      title,
      completed: false,
    }
    this.tasks.update(tasks => [...tasks, newTask]);
  }

  /**
   * Elimina una tarea de la lista de tareas basado en el índice dado.
   *
   * @param index - El índice de la tarea a eliminar.
   */
  deleteTask(index: number) {
    // Eliminar una tarea de la lista
    this.tasks.update(tasks => tasks.filter((task, i) => i !== index));
  }

  /**
   * Cambia el estado completado de una tarea.
   *
   * @param index - El índice de la tarea a cambiar.
   */
  updateTask(index: number) {
    this.tasks.update(tasks => tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    }));
  }

  updateTaskEditingMode(index: number) {
    this.tasks.update(tasks => tasks.map((task, i) => {
      if (i === index) {
        return {
          ...task,
          editing: true,
        }
      } else {
        // Solo se puede editar una tarea a la vez
        return {
          ...task,
          editing: false,
        };
      }
    }));
  }

  updateTaskText(index: number, Event: Event) {
    const input = Event.target as HTMLInputElement;
    const newValue = input.value;
    this.tasks.update(prevState => {
      return prevState.map((task, i) => {
        if (i === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

}
