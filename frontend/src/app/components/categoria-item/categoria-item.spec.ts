import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaItem } from './categoria-item';

describe('CategoriaItem', () => {
  let component: CategoriaItem;
  let fixture: ComponentFixture<CategoriaItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
