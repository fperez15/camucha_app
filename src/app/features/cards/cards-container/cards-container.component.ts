import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatServiceService } from '../../../services/chat-service.service';

@Component({
  selector: 'app-cards-container',
  standalone: true,
  imports: [CardComponent, CommonModule, FormsModule],
  templateUrl: './cards-container.component.html',
  styleUrl: './cards-container.component.scss'
})
export class CardsContainerComponent implements OnInit {


  cards = [
    { id: 1, icon: 'assets/icons/upload.svg', subtitle: 'Analizar mensaje sospechoso' },
    { id: 2, icon: 'assets/icons/security.svg', subtitle: 'Aprender tips de seguridad.' },
  ];

  isTextareaEnabled = false;
  showCards = true;
  messageText = '';

  constructor(private chatService: ChatServiceService) {}

  ngOnInit() {
    // Suscribirse a los cambios en la visibilidad de las tarjetas
    this.chatService.showCards$.subscribe(show => {
      this.showCards = show;
    });

    // Suscribirse a los cambios en el estado del textarea
    this.chatService.textareaEnabled$.subscribe(enabled => {
      this.isTextareaEnabled = enabled;
    });
  }

  onCardClick(id: number) {
    // Usar el servicio para manejar la selección de tarjetas
    //this.chatService.handleCardSelection(id);
    if (id === 1) {
      this.isTextareaEnabled = true;
      this.showCards = false;
      // Emitir evento al servicio o componente padre
      this.chatService.handleCardSelection(id);
    } else if (id === 2) {
      this.showCards = false;
      // Emitir evento al servicio o componente padre
      this.chatService.handleCardSelection(id);
    }
  }

  // Método para manejar el envío del mensaje de texto
  sendMessage() {
    if (this.messageText.trim()) {
      // Añadir el mensaje del usuario
      this.chatService.addMessages([
        { text: this.messageText, sender: 'user' }
      ]);
      this.messageText = '';

      // Simular respuesta del bot
      setTimeout(() => {
        this.chatService.addMessages([
          { text: 'Estoy analizando tu mensaje...', sender: 'bot' }
        ]);
      }, 500);
    }
  }

  // Método para manejar la subida de archivos
  uploadImage() {
    console.log('Subir imagen solicitado');
    // Simular respuesta del bot
    this.chatService.addMessages([
      { text: 'Subiendo imagen...', sender: 'user' },
      { text: 'Analizando la imagen...', sender: 'bot' }
    ]);
  }
}
