import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-confirmar',
  imports: [CommonModule],
  templateUrl: './botao-confirmar.html',
  styleUrl: './botao-confirmar.scss'
})
export class BotaoConfirmar {
  @Input()
  texto!:string

  @Input()
  variant: 'confirmar'| 'voltar' | 'branco' | 'quadrado' = "confirmar";
}
