// Aqui tenenmos la logica de negocio del componente

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  private welcome = 'Hola';

  tasks = [
    'Instalar angular CLI',
    'Componentes',
    'Array de tareas'
  ]
  getWelcome(){
    return this.welcome;
  }

  name = 'Jose';
  age = 18;
  disabled = false;
  img = 'https://w3schools.com/howto/img_avatar.png';

  person = {
    name: 'Jose',
    age: 18,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
    disabled: false,
  }

  clickHandler(){
    alert('Evento click')
  }
  doubleClickHandler(){
    alert('Evento Doble click')
  }
  changeHandler(event: Event){
    console.log(event);
  }
  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);

  }

}

