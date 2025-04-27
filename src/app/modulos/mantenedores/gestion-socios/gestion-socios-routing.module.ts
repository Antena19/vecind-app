// gestion-socios-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes
import { ListaSociosComponent } from './lista-socios/lista-socios.component';
import { AgregarSocioComponent } from './agregar-socio/agregar-socio.component';
import { EditarSocioComponent } from './editar-socio/editar-socio.component';
import { DetalleSocioComponent } from './detalle-socio/detalle-socio.component';
import { SolicitudesMembresiaComponent } from './solicitudes-membresia/solicitudes-membresia.component';
import { GestionSolicitudesComponent } from './gestion-solicitudes/gestion-solicitudes.component';

const routes: Routes = [
  {
    path: '',
    component: ListaSociosComponent
  },
  {
    path: 'agregar',
    component: AgregarSocioComponent
  },
  {
    path: 'editar/:id',
    component: EditarSocioComponent
  },
  {
    path: 'detalle/:id',
    component: DetalleSocioComponent
  },
  {
    path: 'solicitudes',
    component: SolicitudesMembresiaComponent
  },
  {
    path: 'gestion-solicitudes',
    component: GestionSolicitudesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionSociosRoutingModule { }
