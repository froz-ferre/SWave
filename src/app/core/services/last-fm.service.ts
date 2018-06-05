import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {

  chartUrl = 'https://api.deezer.com/chart/tracks';
  lastFmUrl = 'http://ws.audioscrobbler.com/2.0/';
  api_key = 'api_key=32a63d8e1c209d6f83211a00f8cc838e';

  constructor(protected _http: HttpClient) { }

  getChartArtists(): Observable<any> {
    return this._http.get(`${this.lastFmUrl}?method=chart.gettopartists&${this.api_key}&format=json`);
  }
}
