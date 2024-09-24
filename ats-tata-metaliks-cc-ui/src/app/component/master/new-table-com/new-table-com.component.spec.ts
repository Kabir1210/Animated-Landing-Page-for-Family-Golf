import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTableComComponent } from './new-table-com.component';

describe('NewTableComComponent', () => {
  let component: NewTableComComponent;
  let fixture: ComponentFixture<NewTableComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTableComComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTableComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
