import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    if (this.autenticacionService.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}