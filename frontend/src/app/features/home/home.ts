import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../../core/components/footer/footer';
import { Navbar } from '../../core/components/navbar/navbar';
import { CardProduto } from '../../shared/components/card-produto/card-produto';
import { Detalhes } from '../../shared/components/detalhes/detalhes';
import { Produto } from '../../shared/models/produto';
import { CategoriaService } from '../../core/services/categoria-service';
import { Categoria } from '../../shared/models/categoria';
import { environment } from '../../../environments/environment';

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
  caminho:string = environment.apiUrl;
  list:Categoria[] = [];

  ngAfterViewInit() {
    this.configurarScroll();
  }

  abrirModal(item: Produto) {
    if (item.disponivel!=false){
      this.produtoSelecionado = item;
      this.mostrarModal = true;
    }
  }

  fecharModal() {
    this.mostrarModal = false;
    this.produtoSelecionado = null;
  }
  validarLista(){
    for(const categoria of this.list){
      if (categoria.produtos.length>0){
        this.listaCategorias.push(categoria);
      }
    }
  }
  //Estrutura pra carregar dados
  categoriaService = inject(CategoriaService);
  listaCategorias: Categoria[] = [];
  
  ngOnInit(){
    this.findAll();
  }
  findAll() {
    this.categoriaService.getAll().subscribe({
      next: dados => {
        this.list = Array.isArray(dados) ? dados : [];
        this.validarLista();
      },
      error: err => {
        alert(JSON.stringify(err));
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