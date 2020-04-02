import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Tile } from '../tile';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gridster',
  templateUrl: './gridster.component.html',
  styleUrls: ['./gridster.component.scss']
})

export class GridsterComponent implements OnInit, OnDestroy {
  @Input() boxsize: number;
  @Input() gutter: number;
  @Input('tiles') tiles: Tile[];
  options: GridsterConfig;
  dashboard: GridsterItem[];
  optionSubscription: Subscription;

  constructor(private app: AppComponent) { }

  static itemChange(item, itemComponent) {
    console.info('Gridster itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('Gridster itemResized', item, itemComponent);
  }

  ngOnInit(): void {
    this.optionSubscription = this.app.getOptionsChangeSubject()
      .subscribe((option) => {
        if (option.gutter) {
          this.options.margin = option.gutter;
        }

        if (option.tiles) {
          this.mapTilesToDashboard(option.tiles);
        }
        if (this.options.api && this.options.api.optionsChanged) {
          this.options.api.optionsChanged();
        }
      }
    );
    this.options = {
      itemChangeCallback: GridsterComponent.itemChange,
      itemResizeCallback: GridsterComponent.itemResize,
      gridType: 'fixed',
      fixedColWidth: this.boxsize,
      fixedRowHeight: this.boxsize,
      mobileBreakpoint: 500,
      margin: this.gutter,
      pushItems: true,
      // disablePushOnDrag: true,
      swap: true,
      swapWhileDragging: true,
      outerMargin: false,
      minCols: 1,
    };
    if (this.tiles) {
      this.mapTilesToDashboard(this.tiles);
    }
  }

  ngOnDestroy() {
    this.optionSubscription.unsubscribe();
  }

  mapTilesToDashboard(tiles) {
    let x = 0;
    this.dashboard = tiles.map((tile) => {
      const dashboardItem: GridsterItem = {
        cols: tile.cols,
        rows: tile.rows,
        name: tile.name,
        x,
        y: 0,
      };
      x += tile.cols;
      dashboardItem.dragEnabled = true;
      return dashboardItem;
    });
  }
}
