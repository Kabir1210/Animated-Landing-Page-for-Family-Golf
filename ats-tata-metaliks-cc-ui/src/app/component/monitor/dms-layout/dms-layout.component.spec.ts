import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMSLayoutComponent } from './dms-layout.component';

describe('DMSLayoutComponent', () => {
  let component: DMSLayoutComponent;
  let fixture: ComponentFixture<DMSLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DMSLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DMSLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
