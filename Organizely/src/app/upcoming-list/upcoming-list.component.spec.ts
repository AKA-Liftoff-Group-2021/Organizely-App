import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingListComponent } from './upcoming-list.component';

describe('UpcomingListComponent', () => {
  let component: UpcomingListComponent;
  let fixture: ComponentFixture<UpcomingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
