import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore'; // PATO
import { VibrationService } from 'src/app/servicios/vibration.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { EstadoUsuario } from 'src/app/enums/estado-usuario.enum';
import { ActionSheetController } from '@ionic/angular';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  correo: string;
  clave: string;
  usuarios: Observable<any[]>;
  listaUsuarios: any[];
  esDuenio = false;
  public formLogin: FormGroup;

  constructor(
    public router: Router,
    public db: AngularFirestore,
    public vibration: VibrationService,
    public usuarioService: UsuarioService,
    public fb: FormBuilder,
    public authService: AuthService,
    public actionSheetCtrl: ActionSheetController,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.formLogin = this.fb.group
      ({
        correoLogin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        claveLogin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
      });
  }

  onSubmitLogin(): void {
    if (this.errorFomularioAltaUsarios() === false) {
      this.utilsService.presentLoading();
      const usuario = new Usuario();
      usuario.correo = this.formLogin.controls.correoLogin.value;
      usuario.clave = this.formLogin.controls.claveLogin.value;
      this.authService.signIn(usuario)
        .then((response) => {
          // tslint:disable-next-line:no-shadowed-variable
          response.subscribe((usuario: Usuario) => {  // Aprobado
            this.utilsService.dismissLoading();
            this.formLogin.reset();
            if (usuario.estado === EstadoUsuario.APROBADO) {
              if (usuario.perfil === TipoUsuario.CLIENTE_REGISTRADO || usuario.perfil === TipoUsuario.CLIENTE_ANONIMO) { // Clientes
                this.moveTo('clientes');
              } else { // Personal
                this.moveTo('home');
              }
            } else { // No aprobado
              this.utilsService.presentToast('Hola! Tu cuenta esta pendiente de aprobación.', 'toast-info');
            }
          });
        })
        .catch((reject: any) => {
          console.log(reject);
        });
    }
    else {
      this.utilsService.presentToast('Datos inválidos', 'toast-error');
      this.markAllAsDirtyAltaUsuarios(this.formLogin);
    }
  }

  private markAllAsDirtyAltaUsuarios(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsDirty();
    });
  }

  errorFomularioAltaUsarios(): boolean {
    let retorno = true;
    if (this.formLogin.controls.correoLogin.valid && this.formLogin.controls.claveLogin.valid) {
      retorno = false;
    }
    return retorno;
  }

  errorEnControlLogin(control: string): boolean {
    let retorno = false;
    switch (control) {
      case 'correoLogin':
        if (this.formLogin.controls.correoLogin.valid || this.formLogin.controls.correoLogin.pristine) {
          retorno = false;
        }
        else {
          // this.vibration.vibrar(2000);
          retorno = true;
        }
        break;
      case 'claveLogin':
        if (this.formLogin.controls.claveLogin.valid || this.formLogin.controls.claveLogin.pristine) {
          retorno = false;
        }
        else {
          // this.vibration.vibrar(2000);
          retorno = true;
        }
        break;
    }
    return retorno;
  }

  moveTo(to): void {
    this.utilsService.showLoadingAndNavigate(to);
  }

  limpiarLogin(): void {
    this.formLogin.reset();
  }

  mockLogin() {
    this.utilsService.presentActionsheet({
      buttons: [{
        text: 'Dueño Lucas',
        handler: () => {
          this.formLogin.controls.correoLogin.setValue('lucas@lucas.com');
          this.formLogin.controls.claveLogin.setValue('270699');
        }
      }, {
        text: 'Supervisor',
        handler: () => {
          this.formLogin.controls.correoLogin.setValue('tomas@supervisor.com');
          this.formLogin.controls.claveLogin.setValue('tomaspass');
        }
      }, {
        text: 'COCINERO',
        handler: () => {
          this.formLogin.controls.correoLogin.setValue('cocinero@cocinero.com');
          this.formLogin.controls.claveLogin.setValue('123456');
        }
      }, {
        text: 'Mozo',
        handler: () => {
          this.formLogin.controls.correoLogin.setValue('luciano@mozo.com');
          this.formLogin.controls.claveLogin.setValue('lucianopass');
        }
      }, {
        text: 'Bartender',
        handler: () => {
          this.formLogin.controls.correoLogin.setValue('alicia@bartender.com');
          this.formLogin.controls.claveLogin.setValue('aliciapass');
        }
      }, {
        text: 'Cliente 3',
        handler: () => {
          this.formLogin.controls.correoLogin.setValue('cliente3@cliente3.com');
          this.formLogin.controls.claveLogin.setValue('123456');
        }
      },
      {
        text: 'Cliente 4 (Pendiente)',
        handler: () => {
          this.formLogin.controls.correoLogin.setValue('cliente4@cliente4.com');
          this.formLogin.controls.claveLogin.setValue('123456');
        }
      },
      {
        text: 'Cliente 5',
        handler: () => {
          this.formLogin.controls.correoLogin.setValue('cliente5@cliente5.com');
          this.formLogin.controls.claveLogin.setValue('123456');
        }
      },
      {
        text: 'Cliente Anónimo',
        handler: () => {
          this.formLogin.controls.correoLogin.setValue('pepe@pepe.com');
          this.formLogin.controls.claveLogin.setValue('123456');
        }
      }, {
        text: 'Cerrar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
  }

}
