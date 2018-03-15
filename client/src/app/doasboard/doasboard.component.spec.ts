import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoasboardComponent } from './doasboard.component';

describe('DoasboardComponent', () => {
  let component: DoasboardComponent;
  let fixture: ComponentFixture<DoasboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoasboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
