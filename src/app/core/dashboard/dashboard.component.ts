import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../services/last-fm.service';
import { Artist, Album, Track } from '../model/dashboard.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartArtists: Artist[] = [];
  chartTracks: Track[] = [];

  artistsPage: number;
  tracksPage: number;

  constructor(protected lfs: LastFmService) {
      this.artistsPage = 1;
      this.tracksPage = 1;
   }

  ngOnInit() {
    this.lfs.getChartArtists(this.artistsPage).subscribe(
      artists => this.chartArtists = artists
    );
    this.lfs.getChartTracks(this.tracksPage).subscribe(
      tracks => this.chartTracks = tracks
    );
  }

  showNextArtistsSlide(addPage: number) {
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

  showNextTracksSlide(addPage: number) {
    this.tracksPage += addPage;
    if (this.tracksPage < 1) {
      this.tracksPage = 9;
    } else if (this.tracksPage > 9) {
      this.tracksPage = 1;
    }
    console.log('next ' + this.tracksPage);
    this.lfs.getChartTracks(this.tracksPage).subscribe(
      artists => {

        this.chartTracks = artists;
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
