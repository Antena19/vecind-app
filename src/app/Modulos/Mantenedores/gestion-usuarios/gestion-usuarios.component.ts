import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Usuario } from 'src/app/Modelos/Usuario';
import { MantenedoresService } from 'src/app/services/mantenedores.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss'],
})
export class GestionUsuariosComponent  implements OnInit {

  listaUsuarios: Usuario[]=[];

  private _unsubscribeAll: Subject<any>;
  constructor(
    private router: Router,
    private servicioMantenedores: MantenedoresService
  ) {this._unsubscribeAll = new Subject(); }

  ngOnInit() {

    this.listarUsuarios(-1);
    console.log("La lista de usuarios es:",this.listaUsuarios);
  }

  //METODO PARA SOLICITAR AL SERVICIO LA LISTA DE USUARIOS
  listarUsuarios(rut: number){

    this.servicioMantenedores
            .getUsuario(rut)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((usuariosCargados: Usuario[]) => {
                if (usuariosCargados) {
                    this.listaUsuarios = usuariosCargados;                    
                }
            });
  }

}
