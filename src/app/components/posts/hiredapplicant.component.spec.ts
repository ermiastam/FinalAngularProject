import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredapplicantComponent } from './hiredapplicant.component';

describe('HiredapplicantComponent', () => {
  let component: HiredapplicantComponent;
  let fixture: ComponentFixture<HiredapplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiredapplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiredapplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
