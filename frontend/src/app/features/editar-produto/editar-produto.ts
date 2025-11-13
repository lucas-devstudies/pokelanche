import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../../shared/models/categoria';
import { CategoriaService } from '../../core/services/categoria-service';
import { FormsModule } from "@angular/forms";
import { ProdutoCreateDTO } from '../../shared/models/produtoCreateDTO';
import { ProdutosService } from '../../core/services/produtos-service';
import { NavbarAdm } from '../../core/components/navbar-adm/navbar-adm';
import { BotaoConfirmar } from '../../shared/components/botao-confirmar/botao-confirmar';
import { ImgSelecionavel } from '../../shared/components/img-selecionavel/img-selecionavel';
import { NgxMaskDirective } from 'ngx-mask';
import { Produto } from '../../shared/models/produto';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-editar-produto',
  imports: [CommonModule, FormsModule, NavbarAdm, BotaoConfirmar, ImgSelecionavel, NgxMaskDirective],
  templateUrl: './editar-produto.html',
  styleUrl: './editar-produto.scss'
})
export class EditarProduto {
  id!: number;
  @Input() produto: Produto = new Produto();
  img: string = '';
  caminho = environment.apiUrl;
  prodDTO= {} as ProdutoCreateDTO;

  constructor(
    private router: Router,
    private produtoService: ProdutosService,
    private activatedRoute: ActivatedRoute
  ) {}

  categoriaService = inject(CategoriaService);
  listaCategorias: Categoria[] = [];

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.findById();
    this.onImagemSelecionada(this.prodDTO.imagem);
    this.findAllByCategoria();
  }

  async findById() {
  this.produtoService.getById(this.id).subscribe({
    next: async dados => {
      this.produto = dados.produto;
      this.img = dados.produto.url_imagem;
      this.img = `${this.caminho.replace(/\/$/, '')}/${this.img.replace(/^\//, '')}`;

      await this.converte();
    },
    error: err => console.error(err)
  });
}


  async  converte() {
    if (!this.img) {
      console.warn('Imagem ainda não carregada');
      return;
    }
    const urlCompleta = `${this.caminho.replace(/\/$/, '')}/${this.img.replace(/^\//, '')}`;
    try {
      this.prodDTO.imagem = await this.urlToFile(urlCompleta, this.img);
    } catch (error) {
    }
  }

  async urlToFile(url: string, filename: string): Promise<File> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
  }
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

  findAllByCategoria() {
    this.categoriaService.getAll().subscribe({
      next: dados => {
        this.listaCategorias = Array.isArray(dados) ? dados : [];
      },
      error: err => console.error(err)
    });
  }

  parseDTO() {
    this.prodDTO.nome = this.produto.nome;
    this.prodDTO.descricao = this.produto.descricao;
    this.prodDTO.categoria_id = this.produto.id;
    this.prodDTO.valor = this.produto.valor;
  }

  voltar() {
    this.router.navigate(['home-admin']);
  }

  salvar() {
    if (!this.produto.nome || !this.produto.url_imagem || !this.produto.descricao || this.produto.valor <= 0) {
      alert("Preencha todos os campos corretamente");
      return;
    }

    this.parseDTO();

    this.produtoService.add(this.prodDTO).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/home-admin']);
      },
      error: err => console.error(err)
    });
  }

  onImagemSelecionada(file: File) {
    this.prodDTO.imagem = file;
  }
}
