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
  track;

  constructor(protected lfs: LastFmService) {
   }

  ngOnInit() {
    this.getChartArtists();
    Artist.chartArtists.forEach((el: Artist) => {
      this.lfs.getTracks(el.getName()).subscribe(res => el.tracks.push(res));
    })
    this.getTrack(Artist.chartArtists.pop().getName);
    console.log(Artist.chartArtists);
  }

  getChartArtists() {
    this.lfs.getChartArtists().subscribe(data => {
      this.api = data;
    });
  }
  
  getTrack(name) {
    this.lfs.getTracks(name).subscribe(tr => this.track = tr);
  }

}
