import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoConfirmar } from './botao-confirmar';

describe('BotaoConfirmar', () => {
  let component: BotaoConfirmar;
  let fixture: ComponentFixture<BotaoConfirmar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoConfirmar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoConfirmar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
