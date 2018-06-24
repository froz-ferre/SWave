import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../services/last-fm.service';
import { Artist, Album } from '../model/dashboard.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartArtists: Artist[] = [];
  chartAlbums: Album[] = [];

  artistsPage: number;
  albumsPage: number;
  tracksPage: number;

  constructor(protected lfs: LastFmService) {
      this.artistsPage = 1;
   }

  ngOnInit() {
    // this.getChartArtists();
    this.lfs.getChartArtists(this.artistsPage).subscribe(
      artists => this.chartArtists = artists
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

  showNextAlbumsSlide(addPage: number) {
    this.albumsPage += addPage;
    if (this.albumsPage < 1) {
      this.albumsPage = 9;
    } else if (this.albumsPage > 9) {
      this.albumsPage = 1;
    }
    console.log('next ' + this.albumsPage);
    this.lfs.getChartAlbums(this.albumsPage).subscribe(
      artists => {

        this.chartAlbums = artists;
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
