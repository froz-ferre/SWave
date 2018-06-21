import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../services/last-fm.service';
import { Artist } from '../model/dashboard.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  api: Artist[];

  constructor(protected lfs: LastFmService) {   }

  ngOnInit() {
    // this.getChartArtists();
    this.api = this.lfs.artists;
  }

  // getChartArtists() {
  //   this.lfs.getChartArtists();
  // }

  getTrack(name) {
    this.lfs.getTracks(name).subscribe(tr => this.api[0].tracks.push(tr));
  }

}
