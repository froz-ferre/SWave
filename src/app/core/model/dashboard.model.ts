import { Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class Artist {
    private name: string;
    private img: string;
    private tracks: any;
  
    constructor(name: string, img: string, private _injector?: Injector) {
      this.name = name;
      this.img = img;
      this.getTracks(name).subscribe(track => console.log(track) /*this.tracks.push(track)*/);
    }
  
    getTracks(name) {
      /*  */
      name = name.includes(' ') ?  name.split(' ').join('+') : name; // Arctic Monkeys => Arctic+Monkeys
      // const lf = this._injector.get(LastFmService);
      // const url = `${lf.lastFmUrl}?method=artist.gettoptracks&artist=${name}&${lf.api_key}&format=json`;
      // tslint:disable-next-line:max-line-length
      const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name}&api_key=32a63d8e1c209d6f83211a00f8cc838e&format=json`;
      return this._injector.get(HttpClient).get(url); // .pipe(map(data => data.slice(0,4))
    }
  }
  
  export class Track {}
  
  export class Album {}