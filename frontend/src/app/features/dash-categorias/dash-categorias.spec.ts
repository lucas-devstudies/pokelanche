import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCategorias } from './dash-categorias';

describe('DashCategorias', () => {
  let component: DashCategorias;
  let fixture: ComponentFixture<DashCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCategorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
