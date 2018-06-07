import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Artist, Track } from './../model/dashboard.model';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {

  chartUrl = 'https://api.deezer.com/chart/tracks';
  lastFmUrl = 'http://ws.audioscrobbler.com/2.0/';
  api_key = 'api_key=32a63d8e1c209d6f83211a00f8cc838e';

  artists: Artist[] = [];

  constructor(protected _http: HttpClient) { }

  validateName(name: string) {
    // Arctic Monkeys => Arctic+Monkeys
    return name = name.includes(' ') ?  name.split(' ').join('+') : name;    
  }

  getChartArtists(): Observable<any> {
    return this._http.get(`${this.lastFmUrl}?method=chart.gettopartists&${this.api_key}&format=json`)
    .pipe(
      map(res => res['artists']['artist']),
      map(res => {
        res.forEach(element => {
          const temp = new Artist(
              element.name,
              element.image[2]['#text'],
              Array<Track> ()
            );
            Artist.chartArtists.push(temp);
        });
      })
    );
  }

  getArtistInfo(name: string): Observable<any> {
    return this._http.get(`${this.lastFmUrl}?method=artist.getinfo&artist=${this.validateName(name)}&${this.api_key}&format=json`);
  }

  getTracks(name: string) {
    const url = `${this.lastFmUrl}?method=artist.gettoptracks&artist=${this.validateName(name)}&${this.api_key}&format=json`;
    return this._http.get(url)
    .pipe(map(res => res['toptracks']['track'][0]));
  }

}
