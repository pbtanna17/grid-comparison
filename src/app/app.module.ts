import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragulaModule } from 'ng2-dragula';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridListDynamicExampleComponent } from './grid-list-dynamic-example/grid-list-dynamic-example.component';
import { EachWidgetComponent } from './each-widget/each-widget.component';
import { MuuriExampleComponent } from './muuri-example/muuri-example.component';
import { GridsterComponent } from './gridster/gridster.component';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  declarations: [
    AppComponent,
    GridListDynamicExampleComponent,
    EachWidgetComponent,
    MuuriExampleComponent,
    GridsterComponent
  ],
  imports: [
    MatGridListModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    GridsterModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
