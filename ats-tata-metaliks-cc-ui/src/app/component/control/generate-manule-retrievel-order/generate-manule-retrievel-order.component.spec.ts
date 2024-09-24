import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateManuleRetrievelOrderComponent } from './generate-manule-retrievel-order.component';

describe('GenerateManuleRetrievelOrderComponent', () => {
  let component: GenerateManuleRetrievelOrderComponent;
  let fixture: ComponentFixture<GenerateManuleRetrievelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateManuleRetrievelOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateManuleRetrievelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
