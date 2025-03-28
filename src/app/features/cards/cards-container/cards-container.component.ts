import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatServiceService } from '../../../services/chat-service.service';
import { FraudDetectionService } from '../../../services/fraud-detection.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  isLoading = false;

  messages: { text: string, sender: 'bot' | 'user' }[] = [];

  constructor(private chatService: ChatServiceService,
    private fraudDetectionService: FraudDetectionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {

    this.chatService.showCards$.subscribe(show => {
      this.showCards = show;
    });

    this.chatService.textareaEnabled$.subscribe(enabled => {
      this.isTextareaEnabled = enabled;
    });
  }

  onCardClick(id: number) {

    if (id === 1) {
      this.isTextareaEnabled = true;
      this.showCards = false;
      this.chatService.handleCardSelection(id);
    } else if (id === 2) {
      this.showCards = false;
      this.chatService.handleCardSelection(id);
    }
  }

// Método para enviar un mensaje de texto para análisis
sendMessage() {
  if (this.messageText.trim()) {

    this.chatService.addMessages([
      { text: this.messageText, sender: 'user' }
    ]);

    this.isLoading = true;

    this.fraudDetectionService.analyzeText(this.messageText).subscribe({
      next: (response) => {
        this.handleAnalysisResponse(response);
        this.messageText = ''; // Limpiar el campo de texto
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al analizar el texto:', error);
        this.chatService.addMessages([
          { text: 'Ocurrió un error al analizar el mensaje. Por favor, intenta de nuevo más tarde.', sender: 'bot' }
        ]);
        this.isLoading = false;
      }
    });
    }
  }

// Método para manejar la subida de archivos
uploadImage(event: Event) {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    // Verificar que sea una imagen válida
    if (!file.type.match('image/(jpeg|jpg|png|webp)')) {
      this.chatService.addMessages([
        { text: 'Por favor, sube solo archivos de imagen (.jpg, .jpeg, .png, .webp)', sender: 'bot' }
      ]);
      return;
    }

    // Verificar el tamaño del archivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.chatService.addMessages([
        { text: 'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.', sender: 'bot' }
      ]);
      return;
    }

    // Crear una URL para la vista previa de la imagen
    const imageUrl = URL.createObjectURL(file);

    // Crear HTML seguro usando DomSanitizer
    const safeHtml = this.sanitizer.bypassSecurityTrustHtml(
      `<div class="image-preview"><img src="${imageUrl}" alt="Imagen subida" class="uploaded-image"></div>Imagen subida para análisis`
    );

    // Añadir mensaje con la imagen como SafeHtml
    this.chatService.addMessages([
      { text: safeHtml, sender: 'user' }
    ]);

    this.isLoading = true;

    // Enviar la imagen para análisis
    this.fraudDetectionService.analyzeImage(file).subscribe({
      next: (response) => {
        this.handleAnalysisResponse(response);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al analizar la imagen:', error);
        this.chatService.addMessages([
          { text: 'Ocurrió un error al analizar la imagen. Por favor, intenta de nuevo más tarde.', sender: 'bot' }
        ]);
        this.isLoading = false;
      }
    });

    input.value = '';
  }
}

// Método para manejar la respuesta del análisis (tanto de texto como de imagen)
private handleAnalysisResponse(response: any) {
  let completeMessage = `${response.message}`;
  if (response.isFraudCase) {
    completeMessage += `\n\n<span class="risk-label">📊 Nivel de riesgo:</span> <span class="risk-value">🚨 ¡${response.nivel_riesgo} riesgo de fraude!</span>`;

    if (response.tips_seguridad && response.tips_seguridad.length > 0) {
      completeMessage += `\n\nConsejos de seguridad:`;
      response.tips_seguridad.forEach((tip: string, index: number) => {
        completeMessage += `\n${index + 1}. ${tip}`;
      });
    }

    if (response.enlaces && response.enlaces.length > 0) {
      completeMessage += `\n\nEnlaces útiles:`;
      response.enlaces.forEach((link: string, index: number) => {
        completeMessage += `\n${index + 1}. ${link}`;
      });
    }
  }

  this.chatService.addMessages([
    { text: completeMessage, sender: 'bot' }
  ]);
}
}
