import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  // Observable para los mensajes del chat
  private messagesSubject = new BehaviorSubject<{ text: string, sender: 'bot' | 'user' }[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  // Observable para controlar la visibilidad de las tarjetas
  private showCardsSubject = new BehaviorSubject<boolean>(true);
  public showCards$ = this.showCardsSubject.asObservable();

  // Observable para controlar si el textarea está habilitado
  private textareaEnabledSubject = new BehaviorSubject<boolean>(false);
  public textareaEnabled$ = this.textareaEnabledSubject.asObservable();

  constructor() { }

  // Método para añadir mensajes al chat
  addMessages(messages: { text: string, sender: 'bot' | 'user' }[]) {
    const currentMessages = this.messagesSubject.getValue();
    this.messagesSubject.next([...currentMessages, ...messages]);
  }

  // Método para ocultar las tarjetas
  setShowCards(show: boolean) {
    this.showCardsSubject.next(show);
  }

  // Método para habilitar/deshabilitar el textarea
  setTextareaEnabled(enabled: boolean) {
    this.textareaEnabledSubject.next(enabled);
  }

  // Método para manejar la selección de tarjetas
  handleCardSelection(id: number) {
    if (id === 1) {
      // Esta línea oculta las tarjetas
      this.setShowCards(false);
      this.setTextareaEnabled(true);
      this.addMessages([
        { text: 'Analizar un mensaje sospechoso', sender: 'user' },
        { text: 'Sube tu captura o pega el mensaje que quieres analizar:', sender: 'bot' }
      ]);
    } else if (id === 2) {
      // Esta línea también oculta las tarjetas para la segunda opción
      this.setShowCards(false);
      this.setTextareaEnabled(false);
      this.addMessages([
        { text: 'Aprender tips de seguridad.', sender: 'user' },
        { text: 'Aquí tienes algunos consejos de seguridad para protegerte de fraudes.', sender: 'bot' }
      ]);
    }
  }
}
