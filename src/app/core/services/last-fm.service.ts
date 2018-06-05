import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {

  chartUrl = 'https://api.deezer.com/chart/tracks';
  lastFmUrl = 'http://ws.audioscrobbler.com/2.0/';
  api_key = 'api_key=32a63d8e1c209d6f83211a00f8cc838e';

  constructor(protected _injector: Injector) { }

  getChartArtists(): Observable<any> {
    return this._injector.get(HttpClient).get(`${this.lastFmUrl}?method=chart.gettopartists&${this.api_key}&format=json`);
  }

  getArtistInfo(): Observable<any> {
    return this._injector.get(HttpClient).get(`${this.lastFmUrl}?method=artist.getinfo&artist=Arctic+Monkeys&${this.api_key}&format=json`);
  }
}

export class Artist {
  private name: string;
  private img: string;
  private tracks?: Track[];

  constructor(name: string, img: string, protected _injector?: Injector) {
    this.name = name;
    this.img = img;
    this.getTracks(name).subscribe(track => console.log(track + ' track ;D') /*this.tracks.push(track)*/);
  }

  getTracks(name) {
    /*  */
    name = name.includes(' ') ?  name.split(' ').join('+') : name;
    const lf = this._injector.get(LastFmService); // Arctic Monkeys => Arctic+Monkeys
    const url = `${lf.lastFmUrl}?method=artist.gettoptracks&artist=${name}&${lf.api_key}&format=json`;
    return this._injector.get(HttpClient).get(url).pipe(map(data => data.slice(0,4)));
  }
}

export class Track {}

export class Album {}
