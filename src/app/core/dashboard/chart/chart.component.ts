import { Component, OnInit, EventEmitter } from '@angular/core';
import { Artist } from '../../model/dashboard.model';
import { Input } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() items: Artist[];

  @Output() showNextSlide = new EventEmitter<number>();
  showNext(addPage: number) {
    this.showNextSlide.emit(addPage);
  }

  constructor() { }

  ngOnInit() {
  }



}
