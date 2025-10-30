import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarTipo } from './selecionar-tipo';

describe('SelecionarTipo', () => {
  let component: SelecionarTipo;
  let fixture: ComponentFixture<SelecionarTipo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarTipo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarTipo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
