import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfeedReportDetailsComponent } from './outfeed-report-details.component';

describe('OutfeedReportDetailsComponent', () => {
  let component: OutfeedReportDetailsComponent;
  let fixture: ComponentFixture<OutfeedReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfeedReportDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutfeedReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
