import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img-selecionavel',
  imports: [CommonModule],
  templateUrl: './img-selecionavel.html',
  styleUrl: './img-selecionavel.scss'
})
export class ImgSelecionavel implements OnChanges {
  @Input() imagemInicial: string | null = null;
  @Output() fileSelected = new EventEmitter<File>();
  backgroundImage: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imagemInicial'] && this.imagemInicial) {
      this.backgroundImage = this.imagemInicial;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.backgroundImage = reader.result as string;
        this.fileSelected.emit(file);
      };

      reader.readAsDataURL(file);
    }
  }
}
