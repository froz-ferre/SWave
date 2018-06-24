import { element } from 'protractor';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, take, timeInterval, filter, every } from 'rxjs/operators';
import { Artist, Track, Album } from './../model/dashboard.model';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {

  // TODO: <-------------------------------------
  // 1) Делаем запросы к чартам, грузим по 5 объектов.
  // Если юзверь кликнет "<" или ">" то подгружаем следующую
  // порцию из 5ти следующих или предидущих объектов.
  // 2) Раз в 10 секунд грузим рандомный объект с артистом в
  // диапазоне [1..50]из чарта артистов.
  // В сервисе подтягиваем для него остальную инфу
  // (альбомы, треки, описание и все, что понадобится).

  chartUrl = 'https://api.deezer.com/chart/tracks';
  lastFmUrl = 'http://ws.audioscrobbler.com/2.0/';
  api_key = 'api_key=32a63d8e1c209d6f83211a00f8cc838e';

  artists: Artist[] = [];
  private str$  = new Subject<Artist[]>();

  constructor(protected _http: HttpClient) {

   }

  search(text): Observable<any> {
    return this._http.get(`${this.lastFmUrl}?method=track.search&track=${this.validateName(text)}&${this.api_key}&format=json`);
  }

  validateName(name: string): string {
    // Arctic Monkeys => Arctic+Monkeys
    return name = name.includes(' ') ?  name.split(' ').join('+') : name;
  }

  // getChartArtists() {
  //   const artistStram$: Observable<any> = this._http.get(`${this.lastFmUrl}?method=chart.gettopartists&${this.api_key}&format=json`)
  //   .pipe(
  //     map(res => res['artists']['artist']),
  //     map(res => {
  //       res.forEach(element => {
  //         const temp = new Artist(
  //             element.name,
  //             element.image[2]['#text'],
  //             this.getTracks(element.name).pipe(
  //               map(arr => arr.slice(0, 4))
  //             )
  //           );
  //           this.artists.push(temp);
  //       });
  //     })
  //   );
  //   return artistStram$.subscribe(); // плохо. Надо бы отписаться.
  // }

  getChartArtists(page: number): Observable<Artist[]> {

    return this._http.get<any>(`${this.lastFmUrl}?method=chart.gettopartists&limit=5&page=${page}&${this.api_key}&format=json`)
               .pipe(map(responce => responce.artists.artist),
                     map(res => res.map(el => el = {name: el.name,
                                                    img:  el.image[2]['#text']})
                     )
               );
  }

  getChartAlbums(page: number): Observable<Album[] > { return null; }

  getChartTracks(page: number): Observable<Track[] > { return null; }

  getArtistInfo(name: string): Observable<any > {
    return this._http.get(`${this.lastFmUrl}?method=artist.getinfo&artist=${this.validateName(name)}&${this.api_key}&format=json`);
  }

  getTracks(name: string) {
    const url = `${this.lastFmUrl}?method=artist.gettoptracks&artist=${this.validateName(name)}&${this.api_key}&format=json`;
    return this._http.get(url)
    .pipe(
      map(res => res['toptracks']['track'])
    );
  }

}
