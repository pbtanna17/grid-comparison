import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuuriExampleComponent } from './muuri-example.component';

describe('MuuriExampleComponent', () => {
  let component: MuuriExampleComponent;
  let fixture: ComponentFixture<MuuriExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuuriExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuuriExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
