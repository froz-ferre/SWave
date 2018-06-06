import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Artist } from './../model/dashboard.model';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {

  chartUrl = 'https://api.deezer.com/chart/tracks';
  lastFmUrl = 'http://ws.audioscrobbler.com/2.0/';
  api_key = 'api_key=32a63d8e1c209d6f83211a00f8cc838e';

  constructor(protected _http: HttpClient) { }

  getChartArtists(): Observable<any> {
    return this._http.get(`${this.lastFmUrl}?method=chart.gettopartists&${this.api_key}&format=json`)
    .pipe(
      map(res => res['artists']['artist']),
      map(res => {
        res.forEach(element => {
          const temp = new Artist(
              element.name,
              element.image[2]['#text'],
              this
            );
            Artist.chartArtists.push(temp);
        });
      })
    );
  }

  getArtistInfo(): Observable<any> {
    return this._http.get(`${this.lastFmUrl}?method=artist.getinfo&artist=Arctic+Monkeys&${this.api_key}&format=json`);
  }

  getTracks(name: string) {
    name = name.includes(' ') ?  name.split(' ').join('+') : name; // Arctic Monkeys => Arctic+Monkeys
    const url = `${this.lastFmUrl}?method=artist.gettoptracks&artist=${name}&${this.api_key}&format=json`;
    return this._http.get(url);
  }

}
