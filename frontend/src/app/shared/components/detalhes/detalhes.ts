import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoConfirmar } from "../botao-confirmar/botao-confirmar";
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-detalhes',
  imports: [CommonModule, BotaoConfirmar],
  templateUrl: './detalhes.html',
  styleUrl: './detalhes.scss'
})
export class Detalhes {
  @Input()
  produto!:Produto;

  @Output() fechar = new EventEmitter<void>();
  fecharModal() {
    this.fechar.emit();
  }
}
