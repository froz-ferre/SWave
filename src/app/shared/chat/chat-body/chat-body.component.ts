import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnInit {

thread;
messages;

@Input('text') text;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              protected chatService: ChatService) {
    activatedRoute.params.subscribe(param => {
      this.thread = param['threadId'];
      this.getMessages(this.thread);
    });
  }

  ngOnInit() {
    this.getMessages(this.thread);
  }

  getMessages(thread: string) {
    this.chatService.getMessages(thread).subscribe(
      msg => {
        this.messages = msg;
      }
    );
  }

  sendMsg(text) {
    this.chatService.sendMessage(text.value, this.thread);
    text.value = '';
  }

}
