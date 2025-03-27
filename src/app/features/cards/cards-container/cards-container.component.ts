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

  // Estado para controlar qué opción está seleccionada
  selectedCardId: number | null = null;
  
  // Estado para el mensaje sospechoso
  suspiciousMessage: string = '';
  
  // Estado para mostrar diferentes secciones
  showPasteMessage: boolean = false;
  showUploadOption: boolean = false;
  isAnalyzing: boolean = false;

  cards = [
    { id: 1, icon: 'assets/icons/upload.svg', title: 'Analiza y reporta un mensaje sospechoso', subtitle: 'Subiendo una captura de pantalla.' },
    { id: 2, icon: 'assets/icons/copy.svg', title: 'Aprender tips de seguridad', subtitle: 'Y evitar posibles fraudes financieros.' },
    // { id: 3,icon: 'assets/icons/alert.svg', title: 'Reportar mensaje fraudulento', subtitle: 'Al buzon de alertas del BCP.' },
    // { id: 4, icon: 'assets/icons/safe.svg', title: 'Aprender tips de seguridad', subtitle: 'Y evitar posibles fraudes financieros.' }
  ];


onCardClick(cardId :number): void {
  this.selectedCardId = cardId;

  // Mostrar la sección correspondiente según la tarjeta seleccionada
  if(cardId === 1){
    this.showPasteMessage = true;
    this.showUploadOption = true;
    this.isAnalyzing = false;
  } else {
    this.showPasteMessage = false;
    this.showUploadOption = false;
    this.isAnalyzing = false;
  }
  }

  // Método para manejar la carga de una captura de pantalla
  uploadScreenshot(): void {
    // Simular el inicio del análisis
    this.isAnalyzing = true;
    this.showUploadOption = false;
    
    // Aquí podrías agregar la lógica real para cargar la imagen
    // Por ejemplo, un temporizador para simular el análisis
    setTimeout(() => {
      this.isAnalyzing = false;
      // Aquí podrías agregar lógica adicional tras el "análisis"
    }, 2000);
}
}
