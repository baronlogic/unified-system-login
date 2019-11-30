import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShocklogicComponent } from './shocklogic.component';

describe('ShocklogicComponent', () => {
  let component: ShocklogicComponent;
  let fixture: ComponentFixture<ShocklogicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShocklogicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShocklogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
