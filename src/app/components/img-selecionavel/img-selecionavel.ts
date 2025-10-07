import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-img-selecionavel',
  imports: [CommonModule],
  templateUrl: './img-selecionavel.html',
  styleUrl: './img-selecionavel.scss'
})
export class ImgSelecionavel {
  backgroundImage: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.backgroundImage = `url('${reader.result}')`;
      };

      reader.readAsDataURL(file);
    }
  }
}