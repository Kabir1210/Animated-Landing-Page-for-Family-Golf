import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcmBufferDetailsComponent } from './ccm-buffer-details.component';

describe('CcmBufferDetailsComponent', () => {
  let component: CcmBufferDetailsComponent;
  let fixture: ComponentFixture<CcmBufferDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CcmBufferDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CcmBufferDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
