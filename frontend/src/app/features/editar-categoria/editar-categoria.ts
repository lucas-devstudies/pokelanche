import { Component, Input } from '@angular/core';
import { NavbarAdm } from "../../core/components/navbar-adm/navbar-adm";
import { BotaoConfirmar } from "../../shared/components/botao-confirmar/botao-confirmar";
import { ImgSelecionavel } from "../../shared/components/img-selecionavel/img-selecionavel";
import { CategoriaCreateDTO } from '../../shared/models/categoriaCreateDTO';
import { Router } from '@angular/router';
import { CategoriaService } from '../../core/services/categoria-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../shared/models/produto';
import { Categoria } from '../../shared/models/categoria';

@Component({
  selector: 'app-editar-categoria',
  imports: [NavbarAdm, BotaoConfirmar, ImgSelecionavel,CommonModule,FormsModule],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.scss'
})
export class EditarCategoria {

  @Input()
  categoria!:CategoriaCreateDTO
  
  nome: string = '';
  constructor(private router: Router,private categoriaService:CategoriaService){}
  
  onImagemSelecionada(file: File) {
    this.categoria.imagem = file;
  }
  voltar(){
    this.router.navigate(['/home-admin']);
  }
  salvar(){
    if (!this.nome || !this.categoria.imagem) {
      alert('Preencha o nome e selecione uma imagem!');
      return;
    }
    const categoriaCreateDTO: CategoriaCreateDTO = {
      nome: this.nome,
      imagem: this.categoria.imagem
    };
    this.categoriaService.add(categoriaCreateDTO).subscribe({
    next: (res) => {
      alert('Categoria cadastrada com sucesso!');
      this.router.navigate(['/home-admin']);
    },
    error: (err) => console.error(err)
  });
  }
}