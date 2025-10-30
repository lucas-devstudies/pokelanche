import { Component } from '@angular/core';
import { ImgSelecionavel } from "../../components/img-selecionavel/img-selecionavel";
import { NavbarAdm } from "../../components/navbar-adm/navbar-adm";
import { BotaoConfirmar } from "../../components/botao-confirmar/botao-confirmar";
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaCreateDTO } from '../../models/categoriaCreateDTO';

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
    const categoriaCreateDTO: CategoriaCreateDTO = {
      nome: this.nome,
      imagem: this.imagemSelecionada
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