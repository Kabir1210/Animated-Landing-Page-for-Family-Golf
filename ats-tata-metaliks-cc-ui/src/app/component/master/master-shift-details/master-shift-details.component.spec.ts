import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterShiftDetailsComponent } from './master-shift-details.component';

describe('MasterShiftDetailsComponent', () => {
  let component: MasterShiftDetailsComponent;
  let fixture: ComponentFixture<MasterShiftDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterShiftDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterShiftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
