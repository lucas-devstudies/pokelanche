import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { CadastroCategoria } from './features/cadastro-categoria/cadastro-categoria';
import { Login } from './features/login/login';
import { CadastroProduto } from './features/cadastro-produto/cadastro-produto';
import { EditarProduto } from './features/editar-produto/editar-produto';
import { SelecionarTipo } from './features/selecionar-tipo/selecionar-tipo';
import { HomeAdmin } from './features/home-admin/home-admin';
import { DashCategorias } from './features/dash-categorias/dash-categorias';
import { EditarCategoria } from './features/editar-categoria/editar-categoria';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'cadastro-categoria',component:CadastroCategoria},
    {path:'login',component:Login},
    {path:'cadastro-produto',component:CadastroProduto},
    {path:'editar-produto/:id',component:EditarProduto},
    {path:'editar-categoria/:id',component:EditarCategoria},
    {path:'selecionar-tipo',component:SelecionarTipo},
    {path:'home-admin',component:HomeAdmin},
    {path:'dash-categorias',component:DashCategorias}
];