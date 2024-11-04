// Aqui tenenmos la logica de negocio del componente

import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./pages/home/nav/nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  welcome = 'Hola';

  tasks = [
    'Instalar angular CLI',
    'Componentes',
    'Array de tareas'
  ]
}
