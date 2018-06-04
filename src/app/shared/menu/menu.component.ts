import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

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

  constructor() { }

  ngOnInit() {
  }

}
