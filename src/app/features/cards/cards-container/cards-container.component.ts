import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-container',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.scss'
})
export class CardsContainerComponent {

  cards = [
    { id: 1, icon: 'assets/icons/upload.svg', title: 'Verificar un posible fraude', subtitle: 'Subiendo una captura de pantalla.' },
    { id: 2, icon: 'assets/icons/copy.svg', title: 'Analizar mensaje sospechoso', subtitle: 'Pega o escribe el texto a verificar.' },
    { id: 3,icon: 'assets/icons/alert.svg', title: 'Reportar mensaje fraudulento', subtitle: 'Al buzon de alertas del BCP.' },
    { id: 4, icon: 'assets/icons/safe.svg', title: 'Aprender tips de seguridad', subtitle: 'Y evitar posibles fraudes financieros.' }
  ];
}
