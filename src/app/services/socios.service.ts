import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socio } from '../Modelos/Socio';
import { SolicitudMembresia } from '../Modelos/DTOs/solicitud-membresia';
import { SolicitudSocioDTO } from '../Modelos/DTOs/solicitud-socio.dto';
import { RechazoDTO } from '../Modelos/DTOs/rechazo.dto';
import { EstadisticasResponse } from '../Modelos/DTOs/estadisticas-response';
import { SocioActivoDTO } from '../Modelos/DTOs/socio-activo.dto';

@Injectable({
    providedIn: 'root'
})
export class SociosService {
    private apiUrl = environment.apiUrl + '/api/socios';

    constructor(private http: HttpClient) { }

    // Obtener lista de socios activos o todos
    listarSociosActivos(incluirInactivos: boolean = false): Observable<SocioActivoDTO[]> {
        const endpoint = incluirInactivos ? 'todos' : 'activos';
        console.log('Llamando al endpoint:', endpoint);
        
        return this.http.get<any[]>(`${this.apiUrl}/${endpoint}`).pipe(
            map(response => {
                return response.map(socio => ({
                    ...socio,
                    activo: socio.estado === 1
                }));
            }),
            tap(response => {
                console.log('Respuesta del backend:', response);
                console.log('Cantidad de socios:', response?.length || 0);
            })
        );
    }

    // Obtener lista de socios (todos)
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
        
        if (solicitud.documentoIdentidad) {
        formData.append('documentoIdentidad', solicitud.documentoIdentidad);
        }
        
        if (solicitud.documentoDomicilio) {
        formData.append('documentoDomicilio', solicitud.documentoDomicilio);
        }

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

    // Actualizar estado de un socio
    actualizarEstadoSocio(idSocio: number, estado: boolean, motivo?: string): Observable<{ mensaje: string }> {
        const body = {
            Estado: estado ? 1 : 0,
            Motivo: motivo || ''
        };
        return this.http.put<{ mensaje: string }>(`${this.apiUrl}/${idSocio}/estado`, body);
    }
}
