import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusZoneComponent } from './focus-zone.component';

describe('FocusZoneComponent', () => {
  let component: FocusZoneComponent;
  let fixture: ComponentFixture<FocusZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FocusZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
