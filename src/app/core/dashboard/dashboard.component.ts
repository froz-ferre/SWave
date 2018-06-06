import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../services/last-fm.service';
import { Artist } from '../model/dashboard.model';


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
    console.log(Artist.chartArtists);
  }

  getChartArtists() {
    this.lfs.getChartArtists().subscribe(data => {
      console.log(data);
    });
  }

}
