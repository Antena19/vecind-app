import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socio } from '../Modelos/Socio';
import { SolicitudMembresia } from '../Modelos/DTOs/solicitud-membresia';
import { SolicitudSocioDTO } from '../Modelos/DTOs/solicitud-socio.dto';
import { RechazoDTO } from '../Modelos/DTOs/rechazo.dto';
import { EstadisticasResponse } from '../Modelos/DTOs/estadisticas-response';

@Injectable({
    providedIn: 'root'
})
export class SociosService {
    private apiUrl = environment.apiUrl + '/api/socios';

    constructor(private http: HttpClient) { }

    // Obtener lista de socios
    listarSocios(idSocio: number = -1): Observable<Socio[]> {
        let params = new HttpParams();
        if (idSocio !== -1) {
            params = params.set('idsocio', idSocio.toString());
        }
        return this.http.get<Socio[]>(this.apiUrl, { params });
    }

    // Solicitar membresía
    solicitarMembresia(solicitud: SolicitudMembresia): Observable<{ mensaje: string }> {
        const formData = new FormData();
        formData.append('rut', solicitud.rut.toString());
        formData.append('documentoIdentidad', solicitud.documentoIdentidad);
        formData.append('documentoDomicilio', solicitud.documentoDomicilio);

        return this.http.post<{ mensaje: string }>(`${this.apiUrl}/solicitar`, formData);
    }

    // Consultar solicitudes
    consultarSolicitudes(estado?: string): Observable<SolicitudSocioDTO[]> {
        let params = new HttpParams();
        if (estado) {
            params = params.set('estado', estado);
        }
        return this.http.get<SolicitudSocioDTO[]>(`${this.apiUrl}/solicitudes`, { params });
    }

    // Aprobar solicitud
    aprobarSolicitud(rut: number): Observable<{ mensaje: string }> {
        return this.http.put<{ mensaje: string }>(`${this.apiUrl}/aprobar/${rut}`, {});
    }

    // Rechazar solicitud
    rechazarSolicitud(rut: number, rechazo: RechazoDTO): Observable<{ mensaje: string }> {
        return this.http.put<{ mensaje: string }>(`${this.apiUrl}/rechazar/${rut}`, rechazo);
    }

    // Obtener estadísticas
    obtenerEstadisticas(): Observable<EstadisticasResponse> {
        return this.http.get<EstadisticasResponse>(`${this.apiUrl}/estadisticas`);
    }
}
