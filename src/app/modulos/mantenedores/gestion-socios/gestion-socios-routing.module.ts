// gestion-socios-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes
import { GestionSociosComponent } from './gestion-socios/gestion-socios.component';
import { ListaSociosComponent } from './lista-socios/lista-socios.component';
import { AgregarSocioComponent } from './agregar-socio/agregar-socio.component';
import { EditarSocioComponent } from './editar-socio/editar-socio.component';
import { DetalleSocioComponent } from './detalle-socio/detalle-socio.component';
import { SolicitudesMembresiaComponent } from './solicitudes-membresia/solicitudes-membresia.component';
import { GestionSolicitudesComponent } from './gestion-solicitudes/gestion-solicitudes.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./gestion-socios/gestion-socios.component').then(m => m.GestionSociosComponent)
  },
  {
    path: 'lista-socios',
    loadComponent: () => import('./lista-socios/lista-socios.component').then(m => m.ListaSociosComponent)
  },
  {
    path: 'agregar-socio',
    loadComponent: () => import('./agregar-socio/agregar-socio.component').then(m => m.AgregarSocioComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./editar-socio/editar-socio.component').then(m => m.EditarSocioComponent)
  },
  {
    path: 'detalle/:id',
    loadComponent: () => import('./detalle-socio/detalle-socio.component').then(m => m.DetalleSocioComponent)
  },
  {
    path: 'solicitudes',
    loadComponent: () => import('./solicitudes-membresia/solicitudes-membresia.component').then(m => m.SolicitudesMembresiaComponent)
  },
  {
    path: 'gestion-solicitudes',
    loadComponent: () => import('./gestion-solicitudes/gestion-solicitudes.component').then(m => m.GestionSolicitudesComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionSociosRoutingModule { }
