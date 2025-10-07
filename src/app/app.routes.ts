import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CadastroCategoria } from './pages/cadastro-categoria/cadastro-categoria';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'cad',component:CadastroCategoria}
];
