import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ReactiveFormsModule]
})
export class HomeComponent {
  // Lista de tareas
  tasks = signal<Task[]>([
      {
      id: new Date(Date.now()),
      title: 'Crear proyecto',
      completed: false
      },
      {
        id: new Date(Date.now()),
        title: 'Instalar angular CLI',
        completed: false
        },
  ]);
  newTaskControl = new FormControl('', {
   nonNullable: true,
   validators: [
    Validators.required,
   ],


  })


  // Manejador de cambio de input
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    // Agregar una nueva tarea
    this.addTask(newTask);
  }

  changeHandlerForm(){

    if(this.newTaskControl.valid){
      const newTask = this.newTaskControl.value.trim();
      if(newTask != '') {
        this.addTask(newTask);
        this.newTaskControl.reset();
      }
    }

  }

  // Agregar una tarea a la lista
  addTask(title: string){
    const newTask: Task = {
      id: new Date(Date.now()),
      title,
      completed: false,
    }
     this.tasks.update(tasks =>[...tasks, newTask]);
  }

  /**
   * Elimina una tarea de la lista de tareas basado en el índice dado.
   *
   * @param index - El índice de la tarea a eliminar.
   */
  deleteTask(index: number){
    // Eliminar una tarea de la lista
    this.tasks.update(tasks => tasks.filter((task, i) => i !== index));
  }

  /**
   * Cambia el estado completado de una tarea.
   *
   * @param index - El índice de la tarea a cambiar.
   */
  updateTask(index: number){
    this.tasks.update(tasks => tasks.map((task, i) => {
      if(i === index){
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    }));
  }
}
