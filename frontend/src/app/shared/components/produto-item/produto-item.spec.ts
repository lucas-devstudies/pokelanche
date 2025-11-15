import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoItem } from './produto-item';

describe('ProdutoItem', () => {
  let component: ProdutoItem;
  let fixture: ComponentFixture<ProdutoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
