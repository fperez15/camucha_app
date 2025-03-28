import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards-container',
  standalone: true,
  imports: [CardComponent, CommonModule, FormsModule],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.scss'
})
export class CardsContainerComponent {

  cards = [
    { icon: 'assets/icons/upload.svg', subtitle: 'Analizar mensaje sospechoso' },
    { icon: 'assets/icons/security.svg', subtitle: 'Aprender tips de seguridad.' },
  ];
}
