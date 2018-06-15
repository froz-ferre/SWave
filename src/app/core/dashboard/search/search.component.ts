import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LastFmService } from '../../services/last-fm.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results;
  term$ = new Subject<string>();

  constructor(private lfs: LastFmService) {
    this.term$.subscribe(term => this.onSearchType(term));
  }

  ngOnInit() {
  }

  onSearchType(text: string) {
    this.lfs.search(text).subscribe(res => this.results = res);
  }

}
