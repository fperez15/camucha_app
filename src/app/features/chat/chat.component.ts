import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardsContainerComponent } from "../cards/cards-container/cards-container.component";
import { ChatServiceService } from '../../services/chat-service.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  // showCards = true;

  // messages: { text: string, sender: 'bot' | 'user' }[] = [];

  // handleCardSelection(id: number) {

  //   if (id === 1) {
  //     this.messages.push(
  //       { text: 'Analizar un mensaje sospechoso', sender: 'user' },
  //       { text: 'Sube tu captura o pega el mensaje que quieres analizar:', sender: 'bot' }
  //     );
  //   } else if (id === 2) {
  //     this.messages.push(
  //       { text: 'Aprender tips de seguridad.', sender: 'user' },
  //       { text: 'Aquí tienes algunos consejos de seguridad para protegerte de fraudes.', sender: 'bot' }
  //     );
  //   }
  // }

  messages: { text: string, sender: 'bot' | 'user' }[] = [];

  constructor(private chatService: ChatServiceService) {}

  ngOnInit() {
    // Suscribirse a los cambios en los mensajes
    this.chatService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

}
