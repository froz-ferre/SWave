import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../services/last-fm.service';
import { Artist } from '../model/dashboard.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartArtists: Artist[] = [];
  artistsPage: number;

  constructor(protected lfs: LastFmService) {
      this.artistsPage = 1;
   }

  ngOnInit() {
    // this.getChartArtists();
    this.lfs.getChartArtists(this.artistsPage).subscribe(
      artists => this.chartArtists = artists
    );
  }

  showNextSlide(addPage: number) {
    this.artistsPage += addPage;
    if (this.artistsPage < 1) {
      this.artistsPage = 9;
    } else if (this.artistsPage > 9) {
      this.artistsPage = 1;
    }
    console.log('next ' + this.artistsPage);
    this.lfs.getChartArtists(this.artistsPage).subscribe(
      artists => {

        this.chartArtists = artists;
      }
    );
  }

  // getChartArtists() {
  //   this.lfs.getChartArtists();
  // }

  // getTrack(name) {
  //   this.lfs.getTracks(name).subscribe(tr => this.api[0].tracks.push(tr));
  // }

}
