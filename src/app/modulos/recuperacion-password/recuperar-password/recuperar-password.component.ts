import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule
  ]
})
export class RecuperarPasswordComponent implements OnInit {
  recuperacionForm!: FormGroup;
  isSubmitted = false;
  cargando = false;
  paso = 1; // 1: solicitud inicial, 2: ingreso de código y nueva contraseña

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.inicializarFormularioSolicitud();
  }

  inicializarFormularioSolicitud() {
    this.recuperacionForm = this.formBuilder.group({
      metodo: ['correo', Validators.required], // 'correo' o 'rut'
      correo_electronico: ['', [Validators.email]],
      rut: ['', [Validators.pattern(/^\d+$/)]],
      dv_rut: ['', [Validators.pattern(/^[0-9kK]$/)]]
    }, {
      validators: this.validarMetodoRecuperacion
    });

    // Actualizar validaciones cuando cambia el método
    this.recuperacionForm.get('metodo')?.valueChanges.subscribe(metodo => {
      if (metodo === 'correo') {
        this.recuperacionForm.get('correo_electronico')?.setValidators([Validators.required, Validators.email]);
        this.recuperacionForm.get('rut')?.clearValidators();
        this.recuperacionForm.get('dv_rut')?.clearValidators();
      } else {
        this.recuperacionForm.get('correo_electronico')?.clearValidators();
        this.recuperacionForm.get('rut')?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
        this.recuperacionForm.get('dv_rut')?.setValidators([Validators.required, Validators.pattern(/^[0-9kK]$/)]);
      }
      
      this.recuperacionForm.get('correo_electronico')?.updateValueAndValidity();
      this.recuperacionForm.get('rut')?.updateValueAndValidity();
      this.recuperacionForm.get('dv_rut')?.updateValueAndValidity();
    });
  }

  inicializarFormularioNuevaPassword(rut: number) {
    this.recuperacionForm = this.formBuilder.group({
      rut: [rut, Validators.required],
      token: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador para asegurar que se proporciona la información adecuada según el método
  validarMetodoRecuperacion(form: FormGroup) {
    const metodo = form.get('metodo')?.value;
    
    if (metodo === 'correo') {
      const correo = form.get('correo_electronico')?.value;
      if (!correo) {
        return { correoRequerido: true };
      }
    } else if (metodo === 'rut') {
      const rut = form.get('rut')?.value;
      const dv = form.get('dv_rut')?.value;
      if (!rut || !dv) {
        return { rutRequerido: true };
      }
    }
    
    return null;
  }

  // Validador para confirmar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Método para validar RUT chileno
  validarRut() {
    const rut = this.recuperacionForm.get('rut')?.value;
    const dv = this.recuperacionForm.get('dv_rut')?.value;
    
    if (!rut || !dv) return;
    
    // Implementación simple de validación de RUT
    let suma = 0;
    let multiplicador = 2;
    
    // Convertir rut a string y recorrerlo de derecha a izquierda
    let rutStr = rut.toString();
    for (let i = rutStr.length - 1; i >= 0; i--) {
      suma += parseInt(rutStr.charAt(i)) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    // Calcular dígito verificador
    const resto = suma % 11;
    const dvCalculado = resto === 0 ? "0" : resto === 1 ? "K" : (11 - resto).toString();
    
    // Verificar si el dígito verificador es válido
    const dvIngresado = dv.toUpperCase();
    if (dvCalculado !== dvIngresado) {
      this.recuperacionForm.get('dv_rut')?.setErrors({ rutInvalido: true });
    } else {
      // Limpiar el error si el RUT es válido
      const errores = this.recuperacionForm.get('dv_rut')?.errors;
      if (errores && errores['rutInvalido']) {
        delete errores['rutInvalido'];
        this.recuperacionForm.get('dv_rut')?.setErrors(Object.keys(errores).length === 0 ? null : errores);
      }
    }
  }

  async solicitarRecuperacion() {
    this.isSubmitted = true;
    
    if (this.recuperacionForm.invalid) {
      return;
    }
    
    this.cargando = true;
    
    const loading = await this.loadingController.create({
      message: 'Procesando solicitud...',
      spinner: 'crescent'
    });
    await loading.present();
    
  // Ajuste importante: el backend espera un objeto con la propiedad "CorreoElectronico"
  const datos = {
    CorreoElectronico: this.recuperacionForm.get('correo_electronico')?.value
  };
    
  this.http.post(`${environment.apiUrl}/api/Autenticacion/recuperar-clave`, datos)
    .subscribe({
      next: async (response: any) => {
        this.cargando = false;
        await loading.dismiss();
          
        const alert = await this.alertController.create({
          header: 'Solicitud enviada',
          message: 'Se ha enviado un código de recuperación a tu correo electrónico registrado. Utilizalo para restablecer tu contraseña.',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.paso = 2;
                // Obtener el RUT desde el formulario o respuesta si está disponible
                const rutFromBackend = response.rut || 0;
                this.inicializarFormularioNuevaPassword(0); // Inicializar con un RUT temporal
              }
            }
          ]
        });
          
          await alert.present();
        },
        error: async (error) => {
          this.cargando = false;
          await loading.dismiss();
          
          let mensajeError = 'Ocurrió un error al procesar la solicitud. Por favor, intenta nuevamente.';
          
          if (error.status === 404) {
            mensajeError = 'No se encontró ninguna cuenta con la información proporcionada.';
          } else if (error.status === 400) {
            mensajeError = error.error?.mensaje || 'Datos inválidos. Verifica la información proporcionada.';
          }
          
          const alert = await this.alertController.create({
            header: 'Error',
            message: mensajeError,
            buttons: ['Aceptar']
          });
          
          await alert.present();
        }
      });
  }

  async confirmarRecuperacion() {
    this.isSubmitted = true;
    
    if (this.recuperacionForm.invalid) {
      return;
    }
    
    this.cargando = true;
    
    const loading = await this.loadingController.create({
      message: 'Actualizando contraseña...',
      spinner: 'crescent'
    });
    await loading.present();
    
  // Ajuste importante: el backend espera un objeto con propiedades específicas
  const datos = {
    Rut: this.recuperacionForm.get('rut')?.value,
    Token: this.recuperacionForm.get('token')?.value,
    NuevaContrasena: this.recuperacionForm.get('password')?.value,
    ConfirmarContrasena: this.recuperacionForm.get('confirmPassword')?.value
  };
    
    this.http.post(`${environment.apiUrl}/api/Autenticacion/confirmar-recuperacion`, datos)
      .subscribe({
        next: async () => {
          this.cargando = false;
          await loading.dismiss();
          
          const alert = await this.alertController.create({
            header: 'Contraseña actualizada',
            message: 'Tu contraseña ha sido actualizada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.',
            buttons: [
              {
                text: 'Iniciar sesión',
                handler: () => {
                  this.router.navigate(['/login']);
                }
              }
            ]
          });
          
          await alert.present();
        },
        error: async (error) => {
          this.cargando = false;
          await loading.dismiss();
          
          let mensajeError = 'Ocurrió un error al actualizar la contraseña. Por favor, intenta nuevamente.';
          
          if (error.status === 400) {
            if (error.error?.mensaje?.includes('token')) {
              mensajeError = 'El código de recuperación es inválido o ha expirado.';
            } else if (error.error?.mensaje?.includes('contraseña')) {
              mensajeError = 'La nueva contraseña no cumple con los requisitos de seguridad.';
            } else {
              mensajeError = error.error?.mensaje || 'Datos inválidos. Verifica la información proporcionada.';
            }
          }
          
          const alert = await this.alertController.create({
            header: 'Error',
            message: mensajeError,
            buttons: ['Aceptar']
          });
          
          await alert.present();
        }
      });
  }

  onSubmit() {
    if (this.paso === 1) {
      this.solicitarRecuperacion();
    } else {
      this.confirmarRecuperacion();
    }
  }

  volver() {
    if (this.paso === 2) {
      this.paso = 1;
      this.inicializarFormularioSolicitud();
      this.isSubmitted = false;
    } else {
      this.router.navigate(['/login']);
    }
  }
}