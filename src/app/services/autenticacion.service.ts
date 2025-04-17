import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Constantes } from '../constantes';
import { Usuario } from '../Modelos/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private _usuario = new BehaviorSubject<Usuario | null>(null);
  private _token = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.cargarDatosGuardados();
  }

  get usuario(): Observable<Usuario | null> {
    return this._usuario.asObservable();
  }

  get token(): Observable<string | null> {
    return this._token.asObservable();
  }

  get tokenValue(): string | null {
    return this._token.value;
  }

  get isAuthenticated(): boolean {
    return !!this._token.value;
  }

  private cargarDatosGuardados() {
    const userData = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
  
    if (userData && token) {
      try {
        this._usuario.next(JSON.parse(userData));
        this._token.next(token);
      } catch(e) {
        console.error('Error al procesar datos guardados:', e);
        // Limpiar datos incorrectos
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
      }
    }
  }

  iniciarSesion(rut: number, dv_rut: string, password: string): Observable<any> {
    const url = `${Constantes.API_URL}/api/Autenticacion/login`;
    const body = {
      username: rut.toString(), // El controlador espera un Username de tipo string
      password: password        // El password coincide
  };
    console.log("FLAG3");
    console.log('Enviando solicitud de login:', body);
    
    return this.http.post<any>(url, body).pipe(
      tap(response => {
        if (response && response.token) {
          const usuario = response.usuario || response.user;
          this._token.next(response.token);
          this._usuario.next(usuario);

          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', JSON.stringify(usuario));
        }
      })
    );
  }

  cerrarSesion() {
    // Eliminar datos de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    // Resetear BehaviorSubjects
    this._token.next(null);
    this._usuario.next(null);
  }

  // Método para obtener los headers con el token de autorización
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenValue}`
    });
  }
}