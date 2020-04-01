import { Component } from '@angular/core';
import { tiles, Tile } from './tile';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'materialgrid';
  boxsize = 100;
  gutter = 10;
  width: number;
  colsize: number;
  rowsize: number;
  tiles;
  optionsChange: Subject<any> = new Subject<any>();

  constructor() {
    this.tiles = tiles;
  }

  setWidth(width: number) {
    this.width = width;
    this.optionsChange.next({width, tiles: null, gutter: this.gutter});
  }

  addWidget() {
    this.tiles = [...this.tiles, {
      rows: this.rowsize,
      cols: this.colsize,
      name: `Name ${this.rowsize} X ${this.colsize}`
    }];

    this.optionsChange.next({width: this.width, tiles: this.tiles});
  }

  getOptionsChangeSubject(): Subject<any> {
    return this.optionsChange;
  }
}
