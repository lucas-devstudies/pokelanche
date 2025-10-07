import { Component, Input } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  @Input()
  lista:Categoria[] = []  
}
