import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-img-selecionavel',
  imports: [CommonModule],
  templateUrl: './img-selecionavel.html',
  styleUrl: './img-selecionavel.scss'
})
export class ImgSelecionavel {
  backgroundImage:String = "";
  selectedFile: File | null = null;
  @Output() fileSelected = new EventEmitter<File>();

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