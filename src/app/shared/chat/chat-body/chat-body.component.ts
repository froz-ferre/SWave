import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
              protected chatService: ChatService) {
    this.thread = activatedRoute.snapshot.params.threadId;
  }

  ngOnInit() {
    this.getMessages(this.thread);
  }

  getMessages(thread: string) {
    this.chatService.getMessages(thread).subscribe(
      msg => {
        this.messages = msg.sort();
      }
    );
  }

  sendMsg(text) {
    this.chatService.sendMessage(text.value, this.thread);
    text.value = '';
  }

}
