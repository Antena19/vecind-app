import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  usuario: any = null;
  tipoUsuario: string = '';

  // Opciones del menú principal
  menuOptions = [
    { 
      title: 'EVENTOS', 
      icon: 'calendar-outline', 
      route: '/eventos',
      access: ['vecino', 'socio', 'directiva'] 
    },
    { 
      title: 'ANUNCIOS', 
      icon: 'notifications-outline', 
      route: '/anuncios',
      access: ['vecino', 'socio', 'directiva'] 
    },
    { 
      title: 'CHAT VECINAL', 
      icon: 'chatbubbles-outline', 
      route: '/chat',
      access: ['vecino', 'socio', 'directiva'] 
    },
    { 
      title: 'RECURSOS', 
      icon: 'information-circle-outline', 
      route: '/recursos',
      access: ['vecino', 'socio', 'directiva'] 
    },
    { 
      title: 'ENCUESTAS', 
      icon: 'document-text-outline', 
      route: '/encuestas',
      access: ['vecino', 'socio', 'directiva'] 
    },
    { 
      title: 'PROYECTOS', 
      icon: 'people-outline', 
      route: '/proyectos',
      access: ['vecino', 'socio', 'directiva'] 
    },
    { 
      title: 'CUOTAS', 
      icon: 'cash-outline', 
      route: '/cuotas',
      access: ['socio', 'directiva'] 
    },
    { 
      title: 'CERTIFICADOS', 
      icon: 'document-outline', 
      route: '/certificados',
      access: ['vecino', 'socio', 'directiva'] 
    },
    { 
      title: 'ADMINISTRACIÓN', 
      icon: 'settings-outline', 
      route: '/admin',
      access: ['directiva'] 
    }
  ];

  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit() {
    this.autenticacionService.usuario.subscribe(user => {
      this.usuario = user;
      this.tipoUsuario = user?.tipo_usuario || 'vecino'; // Por defecto es vecino
    });
  }

  getMenuOptions() {
    return this.menuOptions.filter(option => 
      option.access.includes(this.tipoUsuario)
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  activarAlertaEmergencia() {
    // Aquí irá la lógica para activar la alerta de emergencia
    console.log('Alerta de emergencia activada');
  }
}