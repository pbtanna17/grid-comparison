import { Component, ElementRef, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges, AfterViewChecked } from '@angular/core';
import Muuri from 'muuri';
import { Tile } from '../tile';

@Component({
  selector: 'app-muuri-example',
  templateUrl: './muuri-example.component.html',
  styleUrls: ['./muuri-example.component.scss']
})
export class MuuriExampleComponent implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {
  @Input() boxsize: number;
  @Input() gutter: number;
  @Input('tiles') tiles: Tile[];
  private items: any;
  layout: any;
  private viewChanged: boolean = false;
  addItemChangeSubscription: any;

  constructor(private elem: ElementRef) {
  }

  ngOnInit(): void {
    this.layout = new Muuri('.grid', {
      layoutOnInit: false,
      layout: {
        fillGaps: true,
      },
      dragEnabled: true,
    });
  }

  private removeItems() {
    let existingItems = this.layout.getItems();
    if (existingItems && existingItems.length > 0) {
        this.layout.remove(existingItems, { layout: false });
    }
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.layout) {
      this.removeItems();
      this.viewChanged = !this.viewChanged;
    }
  }
  
  ngAfterViewChecked() {
    if (this.viewChanged) {
      this.viewChanged = !this.viewChanged;
      this.ngAfterViewInit();
    }
  }
}
