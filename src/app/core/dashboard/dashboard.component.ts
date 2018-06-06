import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../services/last-fm.service';


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
    console.log(this.lfs.artists);
  }

  getChartArtists() {
    this.lfs.getChartArtists().subscribe(data => {
      console.log(data);
    });
  }

}
