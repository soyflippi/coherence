import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/internal/operators/map';
import { Mesa } from '../clases/mesa';
import { EstadosMesa } from '../enums/estado-mesa.enum';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene foto de la mesa o una default
  obtenerFoto(mesa: Mesa) {
    let foto = '../../../assets/defaultFotoMesa.png';
    if (mesa.foto) {
      foto = 'data:image/jpeg;base64,' + mesa.foto;
    }
    return foto;
  }

  // Muestra una foto codificada en base 64 o una default
  mostrarFoto(fotoBase64: string) {
    let foto = '../../../assets/defaultFotoMesa.png';
    if (fotoBase64 !== '') {
      foto = 'data:image/jpeg;base64,' + fotoBase64;
    }
    return foto;
  }

  // Obtiene todas las mesas activas
  obtenerMesas() {
    return this.firebaseService.getDocs('mesas').pipe(
      map(mesas => {
        // Solo mesas que no esten dadas de baja
        return mesas.filter((m) => (m.payload.doc.data() as Mesa).fechaBaja === null).map(a => {
          const data = a.payload.doc.data() as Mesa;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Mesas libres
  obtenerMesasLibres() {
    return this.firebaseService.getDocs('mesas').pipe(
      map(mesas => {
        // Solo mesas que no esten dadas de baja
        return mesas.filter((m) => ((m.payload.doc.data() as Mesa).fechaBaja === null &&
          (m.payload.doc.data() as Mesa).estado === EstadosMesa.LIBRE))
          .map(a => {
            const data = a.payload.doc.data() as Mesa;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
      })
    );
  }

    // Mesas asignadas
    obtenerMesasAsignadas() {
      return this.firebaseService.getDocs('mesas').pipe(
        map(mesas => {
          // Solo mesas que no esten dadas de baja
          return mesas.filter((m) => ((m.payload.doc.data() as Mesa).fechaBaja === null &&
            (m.payload.doc.data() as Mesa).estado === EstadosMesa.ASIGNADA))
            .map(a => {
              const data = a.payload.doc.data() as Mesa;
              const id = a.payload.doc.id;
              return { id, ...data };
            });
        })
      );
    }

  // Obtener mesa por id (id)
  obtenerMesa(uid: string) {
    return this.firebaseService.getDoc('mesas', uid).pipe(
      map((mesa: any) => {
        const data = mesa.payload.data() as Mesa;
        const id = uid;
        return { id, ...data };
      })
    );
  }

  // Crear Mesa (Class Mesa)
  crearMesa(mesa: Mesa) {
    mesa.fechaAlta = new Date();
    return this.firebaseService.addDoc('mesas', Object.assign({}, mesa));
  }

  // Actualizar mesas (Class Mesa)
  actualizarMesa(mesa: Mesa) {
    mesa.fechaModificado = new Date();
    return this.firebaseService.updateDoc('mesas', mesa.id, Object.assign({}, mesa));
  }

  // Borrar Mesa (id)
  // Realizamos baja logica de la mesa
  borrarMesa(mesa: Mesa) {
    mesa.fechaBaja = new Date();
    return this.firebaseService.updateDoc('mesas', mesa.id, Object.assign({}, mesa));
  }
}
