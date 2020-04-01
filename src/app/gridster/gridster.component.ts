import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { Tile } from '../tile';
import { AppComponent } from '../app.component';
import { Subject } from 'rxjs';

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
  optionSubscription: Subject<any>;

  constructor(private app: AppComponent) { }

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }

  ngOnInit(): void {
    this.optionSubscription = this.app.getOptionsChangeSubject()
      .subscribe((option) => {
        if (option.gutter) {
          this.options.margin = option.gutter;
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
      swapWhileDragging: true,
      outerMargin: false,
    };
    let x = 0;
    this.dashboard = this.tiles.map((tile) => {
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

  ngOnDestroy() {
    this.optionSubscription.unsubscribe();
  }

}
