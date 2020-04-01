import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachWidgetComponent } from './each-widget.component';

describe('EachWidgetComponent', () => {
  let component: EachWidgetComponent;
  let fixture: ComponentFixture<EachWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
