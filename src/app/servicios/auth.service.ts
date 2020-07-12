import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../clases/usuario';
import { EstadoUsuario } from '../enums/estado-usuario.enum';
import { first } from 'rxjs/operators';
import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public usuarioService: UsuarioService,
    public utilsService: UtilsService
  ) { }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  currentUser() {
    return this.afAuth.currentUser;
  }

  signUp(usuario: Usuario) {
    return new Promise<any>((resolve, reject) => {
      let call = this.afAuth.signInAnonymously();
      if (usuario.perfil !== TipoUsuario.CLIENTE_ANONIMO) {
        call = this.afAuth.createUserWithEmailAndPassword(usuario.correo, usuario.clave);
      }
      call.then(
        (response: any) => {
          if (response) {
            usuario.id = response.user.uid;
            this.usuarioService.crearUsuario(usuario.id, usuario)
              .then((usr: any) => resolve('exito')).catch(e => this.utilsService.handleError(e));
            // ADENTRO DEL RESOLVE => this.obtenerDetalle(usr)
          }
        },
        (error: any) => reject(error));
    });
  }

  signIn(obj) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(obj.correo, obj.clave)
        .then(
          (response: any) => {
            resolve(this.obtenerDetalle(response.user));
          },
          (error: any) => reject(error));
    });
  }

  logout() {
    return this.afAuth.signOut();
  }

  obtenerDetalle(usuario) {
    return this.usuarioService.obtenerUsuario(usuario?.uid);
  }

  /*
  obtenerDetalle(usuario: Usuario)
  {
    console.log(usuario.correo);
    return this.usuarioService.obtenerUsuario(usuario.id);
  }
  */

  gestionarUsuario(usuario: Usuario, action: EstadoUsuario) {
    usuario.estado = action;

    return this.usuarioService.actualizarUsuario(usuario).then((usr) => {
      console.log('Documento actualizado exitósamente!' + usr);
    }, error => console.log(error));
  }

}
