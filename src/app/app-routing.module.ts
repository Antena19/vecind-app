import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadComponent: () => import('./modulos/inicio/inicio.page').then(m => m.InicioPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./modulos/home/home.page').then(m => m.HomePage),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'login',
    loadComponent: () => import('./modulos/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./modulos/registro/registro-vecino/registro-vecino.component').then(m => m.RegistroVecinoComponent)
  },
  /*
  {
    path: 'recuperar-password',
    loadChildren: () => import('./modulos/recuperar-password/recuperar-password.module').then(m => m.RecuperarPasswordPageModule)
  },
  */

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }