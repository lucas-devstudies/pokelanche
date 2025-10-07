import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
import { CardProduto } from "../../components/card-produto/card-produto";
import { Produto } from '../../models/produto';
import { Categoria } from '../../models/categoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, CardProduto,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit {
  @ViewChildren('scrollContainer') scrollContainers!: QueryList<ElementRef>;

  //att: Falta fazer o scrool funcionar pros outros elementos da lista

  produtos: Produto[] = [];
  listaCategorias: Categoria[] = [];
  constructor(){
    //Estrutura da criação dos produtos e criação das seções de categorias
    //(Prestem atenção pra ignorar a parte de baixo. Aqui é pra listar bonitinho, deixem que eu cuido dessa parte mais chatinha)
    let produto1:Produto = new Produto();
    produto1.url ="../assets/36.png"
    produto1.titulo = "X-Pikachu"
    produto1.descricao = "Um sanduíche eletrizante! Três carnes suculentas combinadas em camadas irresistíveis, acompanhadas de queijo derretido, alface fresca, tomate e nosso molho especial que dá aquele choque de sabor. Energia pura em cada mordida, inspirado no carisma do Pikachu!"
    produto1.valor = 28.00;

    let produto2:Produto = new Produto();
    produto2.url ="../assets/36.png"
    produto2.titulo = "X-Pikachu"
    produto2.descricao = "Um sanduíche eletrizante! Três carnes suculentas combinadas em camadas irresistíveis, acompanhadas de queijo derretido, alface fresca, tomate e nosso molho especial que dá aquele choque de sabor. Energia pura em cada mordida, inspirado no carisma do Pikachu!"
    produto2.valor = 28.00;
    
    let categoria1: Categoria = new Categoria();
    categoria1.nome="Sanduiches";
    categoria1.url="../assets/cat-3.png"

    let categoria2: Categoria = new Categoria();
    categoria2.nome="Tapiocas";
    categoria2.url="../assets/cat-4.png"
    
    let categoria3: Categoria = new Categoria();
    categoria3.nome="Doces";
    categoria3.url="../assets/cat-6.png"

    this.produtos.push(produto1);
    this.produtos.push(produto1);
    this.produtos.push(produto1);
    this.produtos.push(produto1);
    this.produtos.push(produto1);
    this.produtos.push(produto1);
    this.produtos.push(produto1);
    this.produtos.push(produto1);
    categoria1.Produtos=this.produtos;
    categoria2.Produtos=this.produtos;
    categoria3.Produtos=this.produtos;
    this.listaCategorias.push(categoria1);
    this.listaCategorias.push(categoria2);
    this.listaCategorias.push(categoria3);
  }
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;

   ngAfterViewInit() {
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