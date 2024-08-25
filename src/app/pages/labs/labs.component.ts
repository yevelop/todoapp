import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

// Aqui tenemos la lógica de negocio del componente


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  private welcome = 'Hola'; // Variable privada para almacenar el saludo

  tasks = signal([
    'Instalar angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio'
  ]); // Array de tareas

  getWelcome(){
    return this.welcome; // Método para obtener el saludo
  }

  name = signal('Jose'); // Variable para almacenar el nombre
  age = 18; // Variable para almacenar la edad
  disabled = false; // Variable para almacenar el estado de deshabilitado
  img = 'https://w3schools.com/howto/img_avatar.png'; // URL de la imagen de avatar

  person = signal({
    name: 'jOsE',
    age: 18,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
    disabled: false,
  }); // Objeto de persona

  colorCtrl = new FormControl();


  clickHandler(){
    alert('Evento click'); // Manejador de evento click
  }

  doubleClickHandler(){
    alert('Evento Doble click'); // Manejador de evento doble click
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue); // Actualiza el valor de la variable name con el nuevo valor
    console.log(newValue); // Imprime el nuevo valor en la consola
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue); // Actualiza el valor de la variable name con el nuevo valor
    console.log(newValue); // Imprime el nuevo valor en la consola
  }

  changeHandlerObject(event: Event) {
    const input = event.target as HTMLInputElement;
    const newAge = parseInt(input.value); // Parsea el valor como un número entero

    // Usa el método update para actualizar solo la edad en el objeto person
    this.person.update(person => ({
      ...person,    // Desestructura el objeto actual para mantener el resto de las propiedades
      age: newAge   // Actualiza la propiedad age con el nuevo valor
    }));
  }
  changeHandlerName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newName = input.value.toLowerCase();


    this.person.update(person => ({
      ...person,    // Desestructura el objeto actual para mantener el resto de las propiedades
      name: newName   // Actualiza la propiedad age con el nuevo valor
    }));
  }

}
