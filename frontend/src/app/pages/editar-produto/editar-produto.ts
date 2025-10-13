import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria-service';
import { Produto } from '../../models/produto';
import { BotaoConfirmar } from '../../components/botao-confirmar/botao-confirmar';
import { NavbarAdm } from '../../components/navbar-adm/navbar-adm';
import { ImgSelecionavel } from '../../components/img-selecionavel/img-selecionavel';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-produto',
  imports: [BotaoConfirmar, NavbarAdm, ImgSelecionavel,CommonModule,FormsModule],
  templateUrl: './editar-produto.html',
  styleUrl: './editar-produto.scss'
})
export class EditarProduto {
  listaCategorias: Categoria[] = [];
  categoriaService: CategoriaService = inject(CategoriaService);
  produto!: Produto;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
    this.reload();
  }

  reload() {
    const idStr = this.route.snapshot.paramMap.get('id');
    if (idStr !== null) {
      const id = Number(idStr);
      if (!isNaN(id)) {
        this.categoriaService.findById(id).subscribe({
          next: (produto: Produto) => {
            this.produto = produto;
          },
          error: (err) => console.error('Erro ao buscar produto:', err)
        });
      } else {
        console.error('ID inválido na rota!');
      }
    }
  }

  findAll() {
    this.categoriaService.getAll().subscribe({
      next: dados => {
        this.listaCategorias = Array.isArray(dados) ? dados : [];
      },
      error: err => console.error('Erro ao carregar categorias:', err)
    });
  }

  voltar() {
    this.router.navigate(['/home-admin']);
  }
}