import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaDTO } from '../../shared/models/categoriaDTO';
import { NavbarAdm } from '../../core/components/navbar-adm/navbar-adm';
import { ImgSelecionavel } from '../../shared/components/img-selecionavel/img-selecionavel';
import { BotaoConfirmar } from '../../shared/components/botao-confirmar/botao-confirmar';
import { CategoriaService } from '../../core/services/categoria-service';

@Component({
  selector: 'app-cadastro-categoria',
  imports: [CommonModule,ImgSelecionavel, NavbarAdm, BotaoConfirmar,FormsModule],
  templateUrl: './cadastro-categoria.html',
  styleUrl: './cadastro-categoria.scss'
})
export class CadastroCategoria {

  nome: string = '';
  imagemSelecionada: File | null = null;

  constructor(private router: Router,private categoriaService:CategoriaService){}
  onImagemSelecionada(file: File) {
    this.imagemSelecionada = file;
  }
  voltar(){
    this.router.navigate(['/home-admin']);
  }
  salvar(){
    if (!this.nome || !this.imagemSelecionada) {
      alert('Preencha o nome e selecione uma imagem!');
      return;
    }
    const CategoriaDTO: CategoriaDTO = {
      nome: this.nome,
      imagem: this.imagemSelecionada
    };
    this.categoriaService.add(CategoriaDTO).subscribe({
    next: (res) => {
      alert('Categoria cadastrada com sucesso!');
      this.router.navigate(['/home-admin']);
    },
    error: (err) => console.error(err)
  });
  }
}