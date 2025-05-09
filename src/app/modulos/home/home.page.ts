import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { Usuario } from '../../modelos/Usuario';

interface MenuOption {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  usuario: Usuario | null = null;
  tipoUsuario: string = 'vecino';

  // Menús específicos por rol
  private menuVecino: MenuOption[] = [
    { 
      title: 'Mi Perfil', 
      icon: 'person-outline', 
      route: '/mi-perfil'
    },
    { 
      title: 'Noticias', 
      icon: 'newspaper-outline', 
      route: '/noticias'
    },
    { 
      title: 'Certificados', 
      icon: 'document-text-outline', 
      route: '/certificados'
    },
    { 
      title: 'Hacerme Socio', 
      icon: 'people-outline', 
      route: '/mantenedores/gestion-socios/solicitar-membresia'
    }
  ];

  private menuSocio: MenuOption[] = [
    { 
      title: 'Mi Perfil', 
      icon: 'person-outline', 
      route: '/mi-perfil'
    },
    { 
      title: 'Noticias', 
      icon: 'newspaper-outline', 
      route: '/noticias'
    },
    { 
      title: 'Certificados', 
      icon: 'document-text-outline', 
      route: '/certificados'
    },
    { 
      title: 'Estado de Cuotas', 
      icon: 'cash-outline', 
      route: '/estado-cuotas'
    }
  ];

  private menuDirectiva: MenuOption[] = [
    { 
      title: 'Mi Perfil', 
      icon: 'person-outline', 
      route: '/mi-perfil'
    },
    { 
      title: 'Noticias', 
      icon: 'newspaper-outline', 
      route: '/noticias'
    },
    { 
      title: 'Certificados', 
      icon: 'document-text-outline', 
      route: '/certificados'
    },
    { 
      title: 'Gestión de Socios', 
      icon: 'people-circle-outline', 
      route: '/mantenedores/gestion-socios'
    },
    { 
      title: 'Gestión de Vecinos', 
      icon: 'people-outline', 
      route: '/mantenedores/gestion-usuarios'
    },
    { 
      title: 'Solicitudes', 
      icon: 'clipboard-outline', 
      route: '/mantenedores/gestion-socios/solicitudes'
    },
    { 
      title: 'Gestión Financiera', 
      icon: 'stats-chart-outline', 
      route: '/gestion-financiera'
    }
  ]

  menuOptions: MenuOption[] = [];

  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit() {
    this.autenticacionService.usuario.subscribe(user => {
      this.usuario = user;
      this.tipoUsuario = user?.tipo_usuario?.toLowerCase() || 'vecino';
      
      // Asignar menú según el rol
      switch(this.tipoUsuario) {
        case 'socio':
          this.menuOptions = this.menuSocio;
          break;
        case 'directiva':
          this.menuOptions = this.menuDirectiva;
          break;
        default: // 'vecino'
          this.menuOptions = this.menuVecino;
      }
    });
  }

  getBienvenida(): string {
    return `Bienvenido, ${this.usuario?.nombre} ${this.usuario?.apellido_paterno}`;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}