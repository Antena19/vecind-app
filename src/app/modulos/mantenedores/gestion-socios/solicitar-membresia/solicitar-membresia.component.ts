import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SociosService } from '../../../../services/socios.service';
import { SolicitudMembresia } from '../../../../Modelos/DTOs/solicitud-membresia';

@Component({
  selector: 'app-solicitar-membresia',
  templateUrl: './solicitar-membresia.component.html',
  styleUrls: ['./solicitar-membresia.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule]
})
export class SolicitarMembresiaComponent {
  solicitud: SolicitudMembresia = {
    rut: 0,
    documentoIdentidad: null,
    documentoDomicilio: null
  };

  documentoIdentidadPreview: string | null = null;
  documentoDomicilioPreview: string | null = null;
  cargando: boolean = false;
  mensaje: string = '';
  mensajeError: string = '';

  constructor(private sociosService: SociosService) {}

  onDocumentoIdentidadChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.solicitud.documentoIdentidad = file;
      this.previewImage(file, 'identidad');
    }
  }

  onDocumentoDomicilioChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.solicitud.documentoDomicilio = file;
      this.previewImage(file, 'domicilio');
    }
  }

  private previewImage(file: File, tipo: 'identidad' | 'domicilio') {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (tipo === 'identidad') {
        this.documentoIdentidadPreview = e.target.result;
      } else {
        this.documentoDomicilioPreview = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  enviarSolicitud() {
    if (!this.validarFormulario()) {
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    this.mensajeError = '';

    this.sociosService.solicitarMembresia(this.solicitud).subscribe({
      next: (response) => {
        this.mensaje = response.mensaje;
        this.limpiarFormulario();
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al enviar solicitud:', error);
        this.mensajeError = 'Error al enviar la solicitud. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  private validarFormulario(): boolean {
    if (!this.solicitud.rut) {
      this.mensajeError = 'Debe ingresar su RUT';
      return false;
    }
    if (!this.solicitud.documentoIdentidad) {
      this.mensajeError = 'Debe adjuntar su carnet de identidad';
      return false;
    }
    if (!this.solicitud.documentoDomicilio) {
      this.mensajeError = 'Debe adjuntar su comprobante de domicilio';
      return false;
    }
    return true;
  }

  private limpiarFormulario() {
    this.solicitud = {
      rut: 0,
      documentoIdentidad: null,
      documentoDomicilio: null
    };
    this.documentoIdentidadPreview = null;
    this.documentoDomicilioPreview = null;
  }
} 