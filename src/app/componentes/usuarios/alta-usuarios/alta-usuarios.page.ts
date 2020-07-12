import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { CameraService } from 'src/app/servicios/camera.service';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from '../../../servicios/auth.service';
import { Usuario } from '../../../clases/usuario';
import { EstadoUsuario } from 'src/app/enums/estado-usuario.enum';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { UtilsService } from 'src/app/servicios/utils.service';
import { NotificationService } from 'src/app/servicios/notification.service';
import { Notificacion } from 'src/app/clases/notificacion';
import { from } from 'rxjs';
@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.page.html',
  styleUrls: ['./alta-usuarios.page.scss'],
})

export class AltaUsuariosPage implements OnInit {

  public formUsuario: FormGroup;

  usuarios: Observable<any[]>;
  listaUsuarios: any[];
  captureDataUrl = new Array<string>();
  datosEscaneados: any;
  qrScan: any;

  constructor(
    public utilsService: UtilsService,
    private fb: FormBuilder,
    private camera: CameraService,
    public db: AngularFirestore,
    public scanner: BarcodeScanner,
    public authService: AuthService,
    public notificationService: NotificationService
  ) {
    this.usuarios = db.collection('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => this.listaUsuarios = usuarios, error => console.log(error));
  }

  ngOnInit() {
    this.formUsuario = this.fb.group
      ({
        correo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        clave: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
        clave2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
        nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16), Validators.pattern('[a-zA-Z ]*')]],
        apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16), Validators.pattern('[a-zA-Z ]*')]],
        dni: ['', [Validators.required, Validators.min(0), Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
        cuil: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern('[0-9]*')]],
        tipo: ['', [Validators.required]],
        foto: ['', [Validators.required]],
      });

    this.authService.currentUser().then((response: firebase.User) => {
      const aux = this.authService.obtenerDetalle(response);
      aux.subscribe(datos => { });
    }).catch((reject: any) => {

      console.log(reject);
    });

  }


  onSubmitUsuario(): void {
    if (this.errorFomularioAltaUsarios() === false) {
      this.utilsService.presentLoading();
      const nuevoUsuario = new Usuario();
      nuevoUsuario.correo = this.formUsuario.controls.correo.value;
      nuevoUsuario.clave = this.formUsuario.controls.clave.value;
      nuevoUsuario.nombre = this.formUsuario.controls.nombre.value;
      nuevoUsuario.apellido = this.formUsuario.controls.apellido.value;
      nuevoUsuario.dni = this.formUsuario.controls.dni.value;
      nuevoUsuario.cuil = this.formUsuario.controls.cuil.value;
      // nuevoUsuario.estado = EstadoUsuario.APROBADO;
      nuevoUsuario.foto = this.formUsuario.controls.foto.value;
      switch (localStorage.getItem('tipoDeAlta')) {
        case 'DUEÑO':
          nuevoUsuario.perfil = TipoUsuario.DUEÑO;
          nuevoUsuario.estado = EstadoUsuario.APROBADO;
          break;
        case 'SUPERVISOR':
          nuevoUsuario.perfil = TipoUsuario.SUPERVISOR;
          nuevoUsuario.estado = EstadoUsuario.APROBADO;
          break;
        case 'CLIENTE_ANONIMO':
          nuevoUsuario.perfil = TipoUsuario.CLIENTE_ANONIMO;
          nuevoUsuario.estado = EstadoUsuario.APROBADO;
          break;
        case 'CLIENTE_REGISTRADO':
          nuevoUsuario.perfil = TipoUsuario.CLIENTE_REGISTRADO;
          nuevoUsuario.estado = EstadoUsuario.PENDIENTE;
          break;
        case 'EMPLEADO':
          nuevoUsuario.estado = EstadoUsuario.APROBADO;
          switch (this.formUsuario.controls.tipo.value) {
            case 'MOZO':
              nuevoUsuario.perfil = TipoUsuario.MOZO;
              console.log('mozo');
              break;
            case 'METRE':
              nuevoUsuario.perfil = TipoUsuario.METRE;
              console.log('metre');
              break;
            case 'COCINERO':
              nuevoUsuario.perfil = TipoUsuario.COCINERO;
              console.log('cocinero');
              break;
            case 'BARTENDER':
              nuevoUsuario.perfil = TipoUsuario.BARTENDER;
              console.log('bartender');
              break;
          }
          break;
      }
      this.authService.signUp(nuevoUsuario).then(datos => {
        this.utilsService.dismissLoading();
        if (nuevoUsuario.perfil === TipoUsuario.CLIENTE_REGISTRADO)
        {
          const notificacion = new Notificacion();
          notificacion.mensaje = 'Nuevo cliente pendiente de aprobacion';
          notificacion.receptor = TipoUsuario.DUEÑO;
          notificacion.receptorSecundario = TipoUsuario.SUPERVISOR;
          this.notificationService.crearNotificacion(notificacion);
          this.volverAltaUsuarios();
        }
        else{
          this.utilsService.showLoadingAndNavigate('clientes');
        }
        console.log(datos);

      }, (err) => {
        this.utilsService.dismissLoading();
        this.utilsService.handleError(err, true);
        console.log('Error: ' + err);
      });
    }
    else {
      this.utilsService.presentToast('Datos Invalidos', 'toast-error');
      this.markAllAsDirtyAltaUsuarios(this.formUsuario);
    }
  }

  private markAllAsDirtyAltaUsuarios(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsDirty();
    });
  }

  errorFomularioAltaUsarios(): boolean {
    let retorno = true;

    switch (localStorage.getItem('tipoDeAlta')) {
      case 'DUEÑO':
        if (this.formUsuario.controls.correo.valid &&
          this.formUsuario.controls.clave.valid &&
          this.formUsuario.controls.clave.value === this.formUsuario.controls.clave2.value &&
          this.formUsuario.controls.nombre.valid &&
          this.formUsuario.controls.apellido.valid &&
          this.formUsuario.controls.dni.valid && this.formUsuario.controls.cuil.valid /*&& this.formUsuario.controls.foto.valid*/) {
          retorno = false;
        }
        break;

      case 'SUPERVISOR':
        if (this.formUsuario.controls.correo.valid &&
          this.formUsuario.controls.clave.valid &&
          this.formUsuario.controls.clave.value === this.formUsuario.controls.clave2.value &&
          this.formUsuario.controls.nombre.valid &&
          this.formUsuario.controls.apellido.valid && this.formUsuario.controls.dni.valid && this.formUsuario.controls.cuil.valid) {
          retorno = false;
        }
        break;

      case 'EMPLEADO':
        if (this.formUsuario.controls.correo.valid &&
          this.formUsuario.controls.clave.valid &&
          this.formUsuario.controls.clave.value === this.formUsuario.controls.clave2.value &&
          this.formUsuario.controls.nombre.valid &&
          this.formUsuario.controls.apellido.valid &&
          this.formUsuario.controls.dni.valid &&
          this.formUsuario.controls.cuil.valid && this.formUsuario.controls.tipo) {
          if (this.formUsuario.controls.tipo.value === 'MOZO' ||
            this.formUsuario.controls.tipo.value === 'METRE' ||
            this.formUsuario.controls.tipo.value === 'COCINERO' || this.formUsuario.controls.tipo.value === 'BARTENDER') {
            retorno = false;
          }
        }
        break;

      case 'CLIENTE_REGISTRADO':
        if (this.formUsuario.controls.correo.valid &&
          this.formUsuario.controls.clave.valid &&
          this.formUsuario.controls.clave.value === this.formUsuario.controls.clave2.value &&
          this.formUsuario.controls.nombre.valid &&
          this.formUsuario.controls.apellido.valid && this.formUsuario.controls.dni.valid) {
          retorno = false;
        }
        break;

      case 'CLIENTE_ANONIMO':
        /*if (this.formUsuario.controls.correo.valid &&
          this.formUsuario.controls.clave.valid &&
          this.formUsuario.controls.clave.value === this.formUsuario.controls.clave2.value &&
          this.formUsuario.controls.nombre.valid) {
          retorno = false;
        }*/
        if (this.formUsuario.controls.nombre.valid) {
          retorno = false;
        }
        break;
    }

    return retorno;
  }

  mostrarSegunAlta(elemento: string): boolean {
    let retorno = false;
    switch (localStorage.getItem('tipoDeAlta')) {
      case 'DUEÑO':
        if (elemento === 'correo' ||
          elemento === 'clave' ||
          elemento === 'clave2' ||
          elemento === 'nombre' ||
          elemento === 'apellido' ||
          elemento === 'dni' ||
          elemento === 'cuil' ||
          elemento === 'qr') {
          retorno = true;
        }
        break;

      case 'SUPERVISOR':
        if (elemento === 'correo' ||
          elemento === 'clave' ||
          elemento === 'clave2' ||
          elemento === 'nombre' ||
          elemento === 'apellido' ||
          elemento === 'dni' ||
          elemento === 'cuil' ||
          elemento === 'qr') {
          retorno = true;
        }
        break;

      case 'EMPLEADO':
        if (elemento === 'correo' ||
          elemento === 'clave' ||
          elemento === 'clave2' ||
          elemento === 'nombre' ||
          elemento === 'apellido' ||
          elemento === 'dni' ||
          elemento === 'cuil' ||
          elemento === 'tipo' ||
          elemento === 'qr') {
          retorno = true;
        }
        break;

      case 'CLIENTE_REGISTRADO':
        if (elemento === 'correo' ||
          elemento === 'clave' ||
          elemento === 'clave2' ||
          elemento === 'nombre' ||
          elemento === 'apellido' ||
          elemento === 'dni' ||
          elemento === 'qr') {
          retorno = true;
        }
        break;

      case 'CLIENTE_ANONIMO':
        /*if (elemento === 'correo' ||
        elemento === 'clave' ||
        elemento === 'clave2' ||
        elemento === 'nombre') {*/
        if (elemento === 'nombre') {
          retorno = true;
        }
        break;
    }
    return retorno;
  }

  scanQrAltaUsuarios(): void {
    this.scanner.scan({ formats: 'PDF_417' }).then((data) => {
      this.datosEscaneados = data;
      this.cargarDatosQr(this.datosEscaneados);
    }, (err) => {
      console.log('Error: ' + err);
    });
  }

  cargarDatosQr(datos: any): void {
    const parsedData = datos.text.split('@');
    const nombre = parsedData[2].toString();
    const apellido = parsedData[1].toString();
    const dni: number = parsedData[4];
    this.formUsuario.get('nombre').setValue(nombre);
    this.formUsuario.get('apellido').setValue(apellido);
    this.formUsuario.get('dni').setValue(dni);
  }

  tomarFotoAltaUsuarios(): void {
    this.camera.tomarFoto().then(data => {
      this.formUsuario.controls.foto.setValue(data);
    });
  }

  volverAltaUsuarios(): void {
    this.formUsuario.reset();
    this.utilsService.showLoadingAndNavigate('inicio'); // PATO
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

  public getTipoAlta(): string { // PATO
    return localStorage.getItem('tipoDeAlta');
  }
}
