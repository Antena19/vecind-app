export class Socio {
    idsocio: number;
    rut: number;
    fecha_solicitud: Date;
    fecha_aprobacion?: Date;
    estado_solicitud: string;
    motivo_rechazo: string;
    documento_identidad: Uint8Array;
    documento_domicilio: Uint8Array;
    estado: boolean;
  
    constructor(
      idsocio?: number,
      rut?: number,
      fecha_solicitud?: Date,
      fecha_aprobacion?: Date,
      estado_solicitud?: string,
      motivo_rechazo?: string,
      documento_identidad?: Uint8Array,
      documento_domicilio?: Uint8Array,
      estado?: boolean
    ) {
      this.idsocio = idsocio || 0;
      this.rut = rut || 0;
      this.fecha_solicitud = fecha_solicitud || new Date();
      this.fecha_aprobacion = fecha_aprobacion;
      this.estado_solicitud = estado_solicitud || '';
      this.motivo_rechazo = motivo_rechazo || '';
      this.documento_identidad = documento_identidad || new Uint8Array();
      this.documento_domicilio = documento_domicilio || new Uint8Array();
      this.estado = estado || false;
    }
  }