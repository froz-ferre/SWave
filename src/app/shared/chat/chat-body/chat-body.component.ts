import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css']
})
export class ChatBodyComponent implements OnInit {

thread;

  constructor(private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(param => {
      this.thread = param;
      console.log(this.thread);
});
  }

  ngOnInit() {
  }

}
