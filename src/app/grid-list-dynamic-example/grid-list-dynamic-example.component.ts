import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { fromEvent }  from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Tile } from '../tile';

@Component({
  selector: 'app-grid-list-dynamic-example',
  templateUrl: './grid-list-dynamic-example.component.html',
  styleUrls: ['./grid-list-dynamic-example.component.scss']
})
export class GridListDynamicExampleComponent implements OnInit, OnChanges {
  @Input('boxsize') boxsize: number;
  @Input('gutter') gutter: number;
  @Input('tiles') tiles: Tile[];
  @Output() newWidth = new EventEmitter<number>(true);
  columns: number;


  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.columns = 2;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.columns = 4;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.columns = 6;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.columns = 10;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.columns = 16;
        }
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    const resize = fromEvent(window, 'resize');
    const result = resize.pipe(debounceTime(100));
    result.subscribe((event) => {
      this.setColumn(event.target);
    });
  }

  ngOnChanges() {
    this.setColumn(window);
  }

  setColumn(window) {
    const { innerWidth } = window as Window;
    this.columns = Math.floor(innerWidth / (this.boxsize + this.gutter));
    const width = (this.boxsize + this.gutter)*this.columns - this.gutter;
    console.log(innerWidth, this.boxsize, this.gutter, this.columns, width);
    this.newWidth.emit(width + 10);
  }
}
