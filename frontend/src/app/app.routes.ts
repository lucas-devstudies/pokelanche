import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CadastroCategoria } from './pages/cadastro-categoria/cadastro-categoria';
import { Login } from './pages/login/login';
import { CadastroProduto } from './pages/cadastro-produto/cadastro-produto';
import { SelecionarTipo } from './pages/selecionar-tipo/selecionar-tipo';
import { HomeAdmin } from './pages/home-admin/home-admin';
import { EditarProduto } from './pages/editar-produto/editar-produto';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'cadastro-categoria',component:CadastroCategoria},
    {path:'login',component:Login},
    {path:'cadastro-produto',component:CadastroProduto},
    {path:'editar-produto/:id',component:EditarProduto},
    {path:'selecionar-tipo',component:SelecionarTipo},
    {path:'home-admin',component:HomeAdmin},
];