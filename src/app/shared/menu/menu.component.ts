import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;


  close(reason: string) {
    this.sidenav.close();
  }

  constructor(protected _router: Router,
              public _as: AuthService) { }

  ngOnInit() {
  }

}
