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
  {
    path: 'recuperar-password',
    loadComponent: () => import('./modulos/recuperacion-password/recuperar-password/recuperar-password.component').then(m => m.RecuperarPasswordComponent)
  },
  {
    path: 'mi-perfil',
    loadComponent: () => import('./modulos/perfil/mi-perfil/mi-perfil.component').then(m => m.MiPerfilComponent),
    canActivate: [AuthGuard] 
  },
  {
    path: 'mantenedores/gestion-socios',
    loadChildren: () => import('./modulos/mantenedores/gestion-socios/gestion-socios/gestion-socios.module').then(m => m.GestionSociosModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }