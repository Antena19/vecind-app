import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Importar el módulo de rutas
import { GestionSociosRoutingModule } from '../gestion-socios-routing.module';

// Importar los componentes
import { ListaSociosComponent } from '../lista-socios/lista-socios.component';
import { AgregarSocioComponent } from '../agregar-socio/agregar-socio.component';
import { EditarSocioComponent } from '../editar-socio/editar-socio.component';
import { DetalleSocioComponent } from '../detalle-socio/detalle-socio.component';
import { SolicitudesMembresiaComponent } from '../solicitudes-membresia/solicitudes-membresia.component';
import { GestionSolicitudesComponent } from '../gestion-solicitudes/gestion-solicitudes.component';

@NgModule({
  declarations: [], // Deja las declaraciones vacías
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GestionSociosRoutingModule,
    // Importa los componentes como standalone
    ListaSociosComponent,
    AgregarSocioComponent,
    EditarSocioComponent,
    DetalleSocioComponent,
    SolicitudesMembresiaComponent,
    GestionSolicitudesComponent
  ]
})
export class GestionSociosModule { }