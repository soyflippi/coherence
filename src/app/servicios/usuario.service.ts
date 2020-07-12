import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Usuario } from 'src/app/clases/usuario';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene foto del usuario o una default
  obtenerFoto(usuario: Usuario) {
    let foto = '../../../assets/defaultFoto.png';
    if (usuario.foto !== '') {
      foto = 'data:image/jpeg;base64,' + usuario.foto;
    }
    return foto;
  }

  // Muestra una foto codificada en base 64 o una default
  mostrarFoto(fotoBase64: string) {
    let foto = '../../../assets/defaultFoto.png';
    if (fotoBase64 !== '') {
      foto = 'data:image/jpeg;base64,' + fotoBase64;
    }
    return foto;
  }

  // Obtiene todos los usuarios activos
  obtenerUsuarios() {
    return this.firebaseService.getDocs('usuarios').pipe(
      map(users => {
        // Solo usuarios que no esten dados de baja
        return users.filter((u) => (u.payload.doc.data() as Usuario).fechaBaja === null).map(a => {
          const data = a.payload.doc.data() as Usuario;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtener usuario por id (id)
  obtenerUsuario(uid: string) {
    return this.firebaseService.getDoc('usuarios', uid).pipe(
      map((user: any) => {
        const data = user.payload.data() as Usuario;
        const id = uid;
        return { id, ...data };
      })
    );
  }

  // Crear usuario (Class Usuario)
  crearUsuario(id: string, usr: Usuario) {
    usr.fechaAlta = new Date();
    return this.firebaseService.addDoc2('usuarios', id, Object.assign({}, usr));
  }

  // Actualizar usuario (Class Usuario)
  actualizarUsuario(usr: Usuario) {
    usr.fechaModificado = new Date();
    return this.firebaseService.updateDoc('usuarios', usr.id, Object.assign({}, usr));
  }

  // Borrar usuario
  // Realizamos baja logica del usuario
  borrarUsuario(usr: Usuario) {
    usr.fechaBaja = new Date();
    return this.firebaseService.updateDoc('usuarios', usr.id, Object.assign({}, usr));
  }
}
