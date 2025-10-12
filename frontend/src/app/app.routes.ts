import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CadastroCategoria } from './pages/cadastro-categoria/cadastro-categoria';
import {Login} from './pages/login/login';
import {HomeAdm} from './pages/home-adm/home-adm';
export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path: 'login',component :Login},
    {path:'cad',component: CadastroCategoria},
    {path: 'homeAdm',component: HomeAdm}
];
