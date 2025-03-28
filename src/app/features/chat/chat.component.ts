import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardsContainerComponent } from "../cards/cards-container/cards-container.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, CardsContainerComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  showCards = true;

  messages: { text: string, sender: 'bot' | 'user' }[] = [];

  handleCardSelection(id: number) {

    if (id === 1) {
      this.messages.push(
        { text: 'Analizar un mensaje sospechoso', sender: 'user' },
        { text: 'Sube tu captura o pega el mensaje que quieres analizar:', sender: 'bot' }
      );
    } else if (id === 2) {
      this.messages.push(
        { text: 'Aprender tips de seguridad.', sender: 'user' },
        { text: 'Aquí tienes algunos consejos de seguridad para protegerte de fraudes.', sender: 'bot' }
      );
    }
  }

}
