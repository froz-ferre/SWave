import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

interface User {
  uid: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  auth;
  users;
  conv;

  constructor(protected _chatService: ChatService,
              private _router: Router) {

  }

  ngOnInit() {

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
    this._chatService.startDirectThread(otherUserId);
  }

}
