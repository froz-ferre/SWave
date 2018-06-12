import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(protected _chatService: ChatService) {
  }

  ngOnInit() {
    this._chatService.someMeth().subscribe(
      res => console.log(res)
    );
  }

}
