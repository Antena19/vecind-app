// Importamos los módulos necesarios de Angular
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Constantes } from "../constantes";
import { Usuario } from "../Modelos/Usuario";

// Decorador que marca esta clase como un servicio inyectable en Angular
@Injectable()
export class MantenedoresService {
   // Constructor que inyecta las dependencias HttpClient y Router
   constructor (private httpClient: HttpClient, private router: Router) {}
    // Token de prueba (reemplázalo con uno válido)
    const tokenTest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

   // Método que obtiene la información de un usuario por su RUT
   // Realiza una petición GET a la API
   getUsuario(rut:number){
       // Configuración de la petición HTTP
       const httpOptions = {
           // Configura las cabeceras HTTP
           headers: new HttpHeaders({
               "Content-Type":"text/plain", // Tipo de contenido en texto plano
               Authorization: "PendienteDeCompletar", // Token de autorización (pendiente)                
           }),
           // Añade el parámetro RUT como query parameter en la URL
           params: new HttpParams().set("rut",rut.toString()),
       };

       // Realiza la petición GET a la API y devuelve el Observable resultante
       return this.httpClient.get<Usuario[]>(
           Constantes.API_URL + "/api/Usuarios", // URL completa del endpoint
           httpOptions // Opciones de la petición (headers y params)
       )
   }
}