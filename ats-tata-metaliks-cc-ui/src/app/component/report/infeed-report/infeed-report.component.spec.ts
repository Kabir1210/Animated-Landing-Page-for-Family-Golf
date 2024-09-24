import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfeedReportComponent } from './infeed-report.component';

describe('InfeedReportComponent', () => {
  let component: InfeedReportComponent;
  let fixture: ComponentFixture<InfeedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfeedReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfeedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
