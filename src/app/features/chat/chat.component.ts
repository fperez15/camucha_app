import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardsContainerComponent } from "../cards/cards-container/cards-container.component";
import { ChatServiceService } from '../../services/chat-service.service';
import { LinkifyPipe } from '../../pipes/linkify.pipe';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, LinkifyPipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  messages: { text: string | SafeHtml, sender: 'bot' | 'user' }[] = [];

  constructor(private chatService: ChatServiceService) {}

  ngOnInit() {
    this.chatService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

isString(val: any): boolean {
  return typeof val === 'string';
  }
}
