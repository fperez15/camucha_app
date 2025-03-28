import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() cardSelected = new EventEmitter<number>();


  cards = [
    { id: 1, icon: 'assets/icons/upload.svg', subtitle: 'Analizar mensaje sospechoso' },
    { id: 2, icon: 'assets/icons/security.svg', subtitle: 'Aprender tips de seguridad.' },
  ];

  isTextareaEnabled = false;
  showCards = true;

  onCardClick(id: number) {
    if (id === 1) {
      this.isTextareaEnabled = true;
      this.showCards = false;
      console.log('showCards ahora es:', this.showCards);
    }
    this.cardSelected.emit(id);
  }
}
