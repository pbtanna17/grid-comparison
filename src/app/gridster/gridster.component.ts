import { Component, OnInit, Input } from '@angular/core';
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import { Tile } from '../tile';

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss']
})


export class GridsterComponent implements OnInit {
  @Input() boxsize: number;
  @Input() gutter: number;
  @Input('tiles') tiles: Tile[];
  options: GridsterConfig;
  dashboard: GridsterItem[];

  constructor() { }

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }

  ngOnInit(): void {
    this.options = {
      itemChangeCallback: GridsterComponent.itemChange,
      itemResizeCallback: GridsterComponent.itemResize,
      gridType: 'fixed',
      fixedColWidth: this.boxsize,
      fixedRowHeight: this.boxsize,
      mobileBreakpoint: 500,
      margin: this.gutter,
      outerMargin: false,
    };
    let x = 0;
    this.dashboard = this.tiles.map((tile) => {
      let dashboardItem: GridsterItem = {
        cols: tile.cols,
        rows: tile.rows,
        name: tile.name,
        x,
        y: 0,
      };
      x += tile.cols;
      return dashboardItem;
    });
  }

}
