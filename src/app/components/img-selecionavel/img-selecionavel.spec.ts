import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSelecionavel } from './img-selecionavel';

describe('ImgSelecionavel', () => {
  let component: ImgSelecionavel;
  let fixture: ComponentFixture<ImgSelecionavel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgSelecionavel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgSelecionavel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
