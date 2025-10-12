import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessView } from './process-view';

describe('ProcessView', () => {
  let component: ProcessView;
  let fixture: ComponentFixture<ProcessView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
