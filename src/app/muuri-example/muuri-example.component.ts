import { Component, ElementRef, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import Muuri from 'muuri';
import { Tile } from '../tile';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-muuri-example',
  templateUrl: './muuri-example.component.html',
  styleUrls: ['./muuri-example.component.scss']
})
export class MuuriExampleComponent implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {
  @Input() boxsize: number;
  @Input() gutter: number;
  @Input() tiles: Tile[];
  @Output() tilesChange: EventEmitter<Tile[]> = new EventEmitter();
  private items: any;
  layout: any;
  private viewChanged: boolean = false;
  addItemChangeSubscription: any;
  width: number;
  optionSubscription: Subscription;

  constructor(private elem: ElementRef, private app: AppComponent) {
  }

  ngOnInit(): void {
    this.optionSubscription = this.app.getOptionsChangeSubject()
    .subscribe((option) => {
      if (option.width) {
        this.width = option.width;
      }
    });
    this.layout = new Muuri('.grid', {
      layoutOnInit: false,
      layout: {
        fillGaps: false,
      },
      dragEnabled: true,
    });
  }

  private addItems() {
    this.layout.add(this.items, { layout: false });
  }

  refresh() {
    this.layout.refreshItems();
    this.layout.layout();
  }

  ngAfterViewInit() {
    this.items = this.elem.nativeElement.querySelectorAll('.item');
    this.addItems();
    this.refresh();
    this.layout.on('layoutEnd', (items) => {
      const newTiles: Tile[] = [];
      let layoutChanged: boolean = false;
      items.forEach((eachItem, parentIndex) => {
        const tileId: string = eachItem._element.getAttribute('data-tile-id');
        const tile: Tile = this.tiles.find((eachTile, index) => {
          if (eachTile.id === parseInt(tileId)) {
            if (parentIndex !== index) {
              layoutChanged = true;
            }
            return true;
          }
          return false;
        });
        newTiles.push(tile);
      });
      this.tiles = [...newTiles];
      if (layoutChanged) {
        this.tilesChange.emit(this.tiles);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.layout) {
      this.viewChanged = !this.viewChanged;
    }
  }
  
  ngAfterViewChecked() {
    let atLeastOne = false;
    if (this.viewChanged) {
      this.viewChanged = !this.viewChanged;
      const items = this.elem.nativeElement.querySelectorAll('.item');
      items.forEach((eachItem) => {
        if (this.layout.getItems(eachItem).length === 0) {
          atLeastOne = true;
          this.layout.add(eachItem);
        }
      });
    }
    if (!atLeastOne) {
      this.refresh();
    }
  }
}
