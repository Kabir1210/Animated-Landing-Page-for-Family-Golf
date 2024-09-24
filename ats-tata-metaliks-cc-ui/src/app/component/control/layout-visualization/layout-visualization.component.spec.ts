import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutVisualizationComponent } from './layout-visualization.component';

describe('LayoutVisualizationComponent', () => {
  let component: LayoutVisualizationComponent;
  let fixture: ComponentFixture<LayoutVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutVisualizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
