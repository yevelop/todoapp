import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks = signal([
    'Instalar angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear cervicio'
  ]);

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    // basicamente el metodo update crea una nueva instancia de la lista de tareas
    // y le agrega el nuevo valor
    this.addTask(newTask);
  }
  addTask(newTask: string){
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
}
