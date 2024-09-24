import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndonScreenComponent } from './andon-screen.component';

describe('AndonScreenComponent', () => {
  let component: AndonScreenComponent;
  let fixture: ComponentFixture<AndonScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AndonScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AndonScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
