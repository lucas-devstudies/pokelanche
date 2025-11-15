import { Component, inject, Input } from '@angular/core';
import { NavbarAdm } from "../../core/components/navbar-adm/navbar-adm";
import { BotaoConfirmar } from "../../shared/components/botao-confirmar/botao-confirmar";
import { ImgSelecionavel } from "../../shared/components/img-selecionavel/img-selecionavel";
import { CategoriaDTO } from '../../shared/models/categoriaDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../core/services/categoria-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Categoria } from '../../shared/models/categoria';

@Component({
  selector: 'app-editar-categoria',
  imports: [NavbarAdm, BotaoConfirmar, ImgSelecionavel,CommonModule,FormsModule],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.scss'
})
export class EditarCategoria {

  id!: number;
  img: string = '';
  caminho = environment.apiUrl;
  
  @Input()
  categoria:Categoria = new Categoria();
  categoriaDTO = {} as CategoriaDTO
  
  nome: string = '';
  constructor( private router: Router, private categoriaService: CategoriaService, private activatedRoute: ActivatedRoute) {}
  
  listaCategorias: Categoria[] = [];
  
  ngOnInit(){
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.findById();
    this.onImagemSelecionada(this.categoriaDTO.imagem);
    this.findAllByCategoria();
  }

  async findById() {
  this.categoriaService.getById(this.id).subscribe({
    next: async dados => {
      this.categoria = dados;
      this.img = dados.url_imagem;
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
    this.categoriaDTO.imagem = await this.urlToFile(urlCompleta, this.img);
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
    this.categoriaDTO.nome = this.categoria.nome;
  }

  voltar() {
    this.router.navigate(['home-admin']);
  }

  salvar() {
    this.parseDTO();
    if (!this.categoria.nome || !this.categoria.url_imagem) {
      alert("Preencha todos os campos corretamente");
      return;
    }
    this.categoriaService.update(this.categoriaDTO,this.categoria.id).subscribe({
      next: (res) => {
        alert('Categoria editada com sucesso!');
        this.router.navigate(['/home-admin']);
      },
      error: (err) => console.error(err)
    });
  }

  onImagemSelecionada(file: File) {
    this.categoriaDTO.imagem = file;
  }
}
