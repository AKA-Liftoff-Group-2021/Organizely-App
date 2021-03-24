import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesFormComponent } from './classes-form.component';

describe('ClassesFormComponent', () => {
  let component: ClassesFormComponent;
  let fixture: ComponentFixture<ClassesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
