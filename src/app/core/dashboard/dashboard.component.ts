import { Component, OnInit } from '@angular/core';
import { LastFmService, Artist } from '../services/last-fm.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  api;

  constructor(protected lfs: LastFmService) {
   }

  ngOnInit() {
    this.getChartArtists();
    const art = new Artist('cher', 'cher');
  }

  getChartArtists() {
    this.lfs.getArtistInfo().subscribe(data => this.api = data);
  }

}
