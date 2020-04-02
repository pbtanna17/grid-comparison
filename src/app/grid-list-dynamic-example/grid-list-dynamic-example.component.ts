import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
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
    this.newWidth.emit(width + this.gutter);
  }
}
