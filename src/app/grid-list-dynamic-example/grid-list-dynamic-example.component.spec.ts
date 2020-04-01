import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridListDynamicExampleComponent } from './grid-list-dynamic-example.component';

describe('GridListDynamicExampleComponent', () => {
  let component: GridListDynamicExampleComponent;
  let fixture: ComponentFixture<GridListDynamicExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridListDynamicExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListDynamicExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
