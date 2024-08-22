// Aqui tenenmos la logica de negocio del componente

import { Component, signal } from '@angular/core';
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

  tasks = signal([
    'Instalar angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear cervicio'
  ]);
  getWelcome(){
    return this.welcome;
  }

  name = signal('Jose');
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
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
    console.log(newValue);
  }
  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);  
    console.log(newValue);
  }

}

