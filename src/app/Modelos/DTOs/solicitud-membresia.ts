export class SolicitudMembresia {
    rut: number;
    documentoIdentidad: File;
    documentoDomicilio: File;

    constructor(
        rut?: number,
        documentoIdentidad?: File,
        documentoDomicilio?: File
    ) {
        this.rut = rut || 0;
        this.documentoIdentidad = documentoIdentidad || new File([], '');
        this.documentoDomicilio = documentoDomicilio || new File([], '');
    }
} 