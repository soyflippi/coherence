import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { CameraService } from 'src/app/servicios/camera.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {

  @Input() usuario: Usuario;
  @Input() callback: any;
  public formUsuario: FormGroup;
  public tipoUsuario = Object.values(TipoUsuario).filter(unTipo => typeof unTipo === 'string');

  constructor(
    private modalCtrl: ModalController,
    public usuarioService: UsuarioService,
    public utilsService: UtilsService,
    private fb: FormBuilder,
    private camera: CameraService
  ) {
    this.formUsuario = this.fb.group
      ({
        nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[a-zA-Z ]*')]],
        apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[a-zA-Z ]*')]],
        dni: ['', [Validators.required, Validators.min(0), Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
        cuil: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern('[0-9]*')]],
        tipo: ['', [Validators.required]],
        foto: [''],
      });

  }

  ngOnInit() {
    console.log(this.usuario);
    this.formUsuario.controls.nombre.setValue(this.usuario.nombre);
    this.formUsuario.controls.apellido.setValue(this.usuario.apellido);
    this.formUsuario.controls.dni.setValue(this.usuario.dni);
    this.formUsuario.controls.cuil.setValue(this.usuario.cuil);
    this.formUsuario.controls.tipo.setValue(this.usuario.perfil);
    this.formUsuario.controls.foto.setValue(this.usuario.foto);
  }

  onSubmitUsuario(): void {
    if (this.formUsuario.valid) {
      this.utilsService.presentLoading();

      this.usuario.nombre = this.formUsuario.controls.nombre.value;
      this.usuario.apellido = this.formUsuario.controls.apellido.value;
      this.usuario.dni = this.formUsuario.controls.dni.value;
      this.usuario.cuil = this.formUsuario.controls.cuil.value;
      this.usuario.perfil = this.formUsuario.controls.tipo.value;

      this.usuario.foto = this.formUsuario.controls.foto.value;

      this.callback(this.usuario)
        .then(usr => {
          console.log('Usuario editado ' + usr);
          this.utilsService.dismissLoading();
          this.dismiss();
          this.utilsService.presentToast('Usuario editado', 'toast-info');
        })
        .catch(error => {
          this.utilsService.dismissLoading();
          this.utilsService.handleError(error);
        });
    }
    else {
      this.utilsService.presentToast('Datos Invalidos', 'toast-error');
    }
  }

  validacionAuxCuil(dni: string): boolean {
    let retorno = false;
    if (this.formUsuario.controls.cuil.pristine) {
      retorno = true;
    }
    else {
      const cuil: string = this.formUsuario.controls.cuil.value;
      if (cuil.includes(dni)) {
        retorno = true;
      }
    }
    return retorno;
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

  tomarFotoAltaUsuarios(): void {
    this.camera.tomarFoto().then(data => {
      this.formUsuario.controls.foto.setValue(data);
    });
  }
}
