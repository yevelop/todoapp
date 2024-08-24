import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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


  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    // basicamente el metodo update crea una nueva instancia de la lista de tareas
    // y le agrega el nuevo valor
    this.addTask(newTask);
  }
  addTask(title: string){
    const newTask: Task = {
      id: new Date(Date.now()),
      title,
      completed: false,
    }
     this.tasks.update(tasks =>[...tasks, newTask]);
  }
  /**
   * Deletes a task from the task list based on the given index.
   *
   * @param index - The index of the task to be deleted.
   */
  deleteTask(index: number){
    // basicamente el metodo update crea una nueva instancia de la lista de tareas
    // sin el valor que se le pasa por parametro no la actualiza, sino que crea una nueva
    // instancia de la lista de tareas
    this.tasks.update(tasks => tasks.filter((task, i) => i !== index));
  }

  /**
   * Toggles the completed status of a task.
   *
   * @param index - The index of the task to be toggled.
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
