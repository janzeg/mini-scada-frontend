import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankHorizontalComponent } from './tank-horizontal-component';

describe('TankHorizontalComponent', () => {
  let component: TankHorizontalComponent;
  let fixture: ComponentFixture<TankHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TankHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TankHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
