import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-each-widget',
  templateUrl: './each-widget.component.html',
  styleUrls: ['./each-widget.component.scss']
})
export class EachWidgetComponent implements OnInit {
  @Input('name') name: string;
  constructor() { }

  ngOnInit(): void {
  }

}
