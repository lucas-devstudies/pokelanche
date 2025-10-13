import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-img-selecionavel',
  imports: [CommonModule],
  templateUrl: './img-selecionavel.html',
  styleUrl: './img-selecionavel.scss'
})
export class ImgSelecionavel {
  @Input()
  backgroundImage: string = '';
  @Output()
  backgroundImageChange = new EventEmitter<string>();


  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      this.backgroundImage = result;         
      this.backgroundImageChange.emit(result);
    };

    reader.readAsDataURL(file);
  }
}

  atualizarImagem(nova: string) {
    this.backgroundImage = nova;
    this.backgroundImageChange.emit(nova);
  }
}