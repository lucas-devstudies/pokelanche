import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren,inject } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { CardProduto } from "../../components/card-produto/card-produto";
import { Produto } from '../../models/produto';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria-service';
import { CommonModule } from '@angular/common';
import { Detalhes } from "../../components/detalhes/detalhes";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, CardProduto, CommonModule, Detalhes],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit {
  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;

  //Lógica pra abrir o modal com os detalhes dos produtos
  mostrarModal = false;
  produtoSelecionado: any = null;

  ngAfterViewInit() {
    this.configurarScroll();
  }

  abrirModal(item: Produto) {
    this.produtoSelecionado = item;
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
    this.produtoSelecionado = null;
  }

  //Estrutura pra carregar dados
  categoriaService = inject(CategoriaService);
  listaCategorias: Categoria[] = [];
  
  ngOnInit(){
    this.findAll();
    this.ngAfterViewInit();
  }
  findAll() {
    this.categoriaService.getAll().subscribe({
      next: dados => {
        this.listaCategorias = Array.isArray(dados) ? dados : [];
      },
      error: err => {
      }
    });
  }
  //Estrutura pra fazer o Scrool de cards
  private configurarScroll() {
    this.scrollContainers.forEach((containerRef: ElementRef) => {
    const container = containerRef.nativeElement;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      e.preventDefault();
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      const x = e.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    });
  });
  }
}