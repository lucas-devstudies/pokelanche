import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { CadastroCategoria } from './features/cadastro-categoria/cadastro-categoria';
import { Login } from './features/login/login';
import { CadastroProduto } from './features/cadastro-produto/cadastro-produto';
import { EditarProduto } from './features/editar-produto/editar-produto';
import { HomeAdmin } from './features/home-admin/home-admin';
import { DashCategorias } from './features/dash-categorias/dash-categorias';
import { EditarCategoria } from './features/editar-categoria/editar-categoria';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'login',component:Login},

    //rotas protegidas
    {path:'cadastro-categoria',canActivate:[authGuard],component:CadastroCategoria},
    {path:'cadastro-produto',canActivate:[authGuard],component:CadastroProduto},
    {path:'editar-produto/:id',canActivate:[authGuard],component:EditarProduto},
    {path:'editar-categoria/:id',canActivate:[authGuard],component:EditarCategoria},
    {path:'home-admin',canActivate:[authGuard],component:HomeAdmin},
    {path:'dash-categorias',canActivate:[authGuard],component:DashCategorias}
];