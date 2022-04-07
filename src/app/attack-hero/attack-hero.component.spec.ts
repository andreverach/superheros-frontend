import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttackHeroComponent } from './attack-hero.component';

describe('AttackHeroComponent', () => {
  let component: AttackHeroComponent;
  let fixture: ComponentFixture<AttackHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttackHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttackHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
