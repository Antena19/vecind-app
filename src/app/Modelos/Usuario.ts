export class Usuario {
    rut: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo_electronico: string;
    telefono: number;
    direccion: string;
    password: string;
    fecha_registro: Date;
    estado: boolean;
    tipo_usuario: string;
  
    constructor(
      rut?: number,
      nombre?: string,
      apellido_paterno?: string,
      apellido_materno?: string,
      correo_electronico?: string,
      telefono?: number,
      direccion?: string,
      password?: string,
      fecha_registro?: Date,
      estado?: boolean,
      tipo_usuario?: string
    ) {
      this.rut = rut || 0;
      this.nombre = nombre || '';
      this.apellido_paterno = apellido_paterno || '';
      this.apellido_materno = apellido_materno || '';
      this.correo_electronico = correo_electronico || '';
      this.telefono = telefono || 0;
      this.direccion = direccion || '';
      this.password = password || '';
      this.fecha_registro = fecha_registro || new Date();
      this.estado = estado || false;
      this.tipo_usuario = tipo_usuario || '';
    }
  }