import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SociosService } from '../../../../services/socios.service';
import { SolicitudSocioDTO } from '../../../../Modelos/DTOs/solicitud-socio.dto';
import { RechazoDTO } from '../../../../Modelos/DTOs/rechazo.dto';

@Component({
  selector: 'app-solicitudes-membresia',
  templateUrl: './solicitudes-membresia.component.html',
  styleUrls: ['./solicitudes-membresia.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class SolicitudesMembresiaComponent implements OnInit {
  solicitudes: SolicitudSocioDTO[] = [];
  filtroEstado: string = 'pendiente';
  motivoRechazo: string = '';
  cargando: boolean = false;
  mensaje: string = '';

  constructor(private sociosService: SociosService) {}

  ngOnInit() {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.cargando = true;
    this.sociosService.consultarSolicitudes(this.filtroEstado).subscribe({
      next: (solicitudes) => {
        this.solicitudes = solicitudes;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar solicitudes:', error);
        this.mensaje = 'Error al cargar las solicitudes';
        this.cargando = false;
      }
    });
  }

  aprobarSolicitud(rut: number) {
    this.cargando = true;
    this.sociosService.aprobarSolicitud(rut).subscribe({
      next: (response) => {
        this.mensaje = response.mensaje;
        this.cargarSolicitudes();
      },
      error: (error) => {
        console.error('Error al aprobar solicitud:', error);
        this.mensaje = 'Error al aprobar la solicitud';
        this.cargando = false;
      }
    });
  }

  rechazarSolicitud(rut: number) {
    if (!this.motivoRechazo.trim()) {
      this.mensaje = 'Debe ingresar un motivo de rechazo';
      return;
    }

    const rechazo: RechazoDTO = {
      motivoRechazo: this.motivoRechazo
    };

    this.cargando = true;
    this.sociosService.rechazarSolicitud(rut, rechazo).subscribe({
      next: (response) => {
        this.mensaje = response.mensaje;
        this.motivoRechazo = '';
        this.cargarSolicitudes();
      },
      error: (error) => {
        console.error('Error al rechazar solicitud:', error);
        this.mensaje = 'Error al rechazar la solicitud';
        this.cargando = false;
      }
    });
  }

  cambiarFiltro(estado: string) {
    if (typeof estado === 'string') {
      this.filtroEstado = estado;
      this.cargarSolicitudes();
    }
  }
}
