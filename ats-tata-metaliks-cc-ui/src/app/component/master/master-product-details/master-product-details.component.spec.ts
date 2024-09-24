import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterProductDetailsComponent } from './master-product-details.component';

describe('MasterProductDetailsComponent', () => {
  let component: MasterProductDetailsComponent;
  let fixture: ComponentFixture<MasterProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterProductDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
