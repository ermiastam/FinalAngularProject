import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantsdetailComponent } from './applicantsdetail.component';

describe('ApplicantsdetailComponent', () => {
  let component: ApplicantsdetailComponent;
  let fixture: ComponentFixture<ApplicantsdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantsdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
