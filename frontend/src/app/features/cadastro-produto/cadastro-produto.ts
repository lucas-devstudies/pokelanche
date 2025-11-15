import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarAdm } from '../../core/components/navbar-adm/navbar-adm';
import { BotaoConfirmar } from '../../shared/components/botao-confirmar/botao-confirmar';
import { ImgSelecionavel } from '../../shared/components/img-selecionavel/img-selecionavel';
import { Categoria } from '../../shared/models/categoria';
import { CategoriaService } from '../../core/services/categoria-service';
import { FormsModule } from "@angular/forms";
import { ProdutoDTO } from '../../shared/models/produtoDTO';
import { ProdutosService } from '../../core/services/produtos-service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-cadastro-produto',
  imports: [BotaoConfirmar, NavbarAdm, ImgSelecionavel, CommonModule, FormsModule,NgxMaskDirective],
  templateUrl: './cadastro-produto.html',
  styleUrl: './cadastro-produto.scss'
})
export class CadastroProduto {

  nome: string  = "";
  imagemSelecionada: File | null = null;
  categoriaSelecionadaId!: number;
  descricao: string = "";
  valor:number = 0.0;

  constructor(private router:Router, private produtoService:ProdutosService){}
  categoriaService = inject(CategoriaService);
  listaCategorias: Categoria[] = [];

  onImagemSelecionada(file: File) {
    this.imagemSelecionada = file;
  }

  ngOnInit(){
    this.findAll();
    this.categoriaSelecionadaId=this.listaCategorias[0].id;
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
  voltar(){
    this.router.navigate(['home-admin']);
  }
  salvar(){
    if (!this.nome || !this.imagemSelecionada || !this.descricao || this.valor<=0) {
          alert("Preencha todos os campos corretamente");
          return;
        }
        const ProdutoCreateDTO: ProdutoDTO = {
          nome: this.nome,
          imagem: this.imagemSelecionada,
          categoria_id: this.categoriaSelecionadaId,
          descricao: this.descricao,
          valor: this.valor
        };

        this.produtoService.add(ProdutoCreateDTO).subscribe({
        next: (res) => {
          alert('Categoria cadastrada com sucesso!');
          this.router.navigate(['/home-admin']);
        },
        error: (err) => console.error(err)
      });
  }
}