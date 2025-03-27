import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { CardsContainerComponent } from "./features/cards/cards-container/cards-container.component";
import { ChatComponent } from "./features/chat/chat.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CardsContainerComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'camucha-app';
}
