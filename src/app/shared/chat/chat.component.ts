import { ChatService, User } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  auth;
  users;
  conv;

  constructor(protected _chatService: ChatService) {

  }

  ngOnInit() {

    this._chatService.getConversations().subscribe(res => {
      res.forEach(el => {
        if (el.uid.indexOf('3') !== -1 && el.uid.indexOf('1') !== -1) {
          console.log(el.id);
        }
      });
    });

    this._chatService.getAuth().pipe(map(res => res.uid)).subscribe(
      res => this.auth = res
    );

    this._chatService.getUsers().subscribe(
      res => {
        this.users = res.filter((user: User) => user.uid !== this.auth);
        // console.log(res);
      }
    );
  }

  startThread(otherUserId) {
    const thr = this._chatService.startDirectThread(otherUserId);
    console.log('thr' + thr);
  }

}
