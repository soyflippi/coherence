import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/internal/operators/map';
import { Propina } from '../clases/propina';

@Injectable({
  providedIn: 'root'
})
export class PropinaService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene todas las propinas activas
  obtenerPropinas() {
    return this.firebaseService.getDocs('propinas').pipe(
      map(propinas => {
        // Solo propinas que no esten dadas de baja
        return propinas.filter((m) => (m.payload.doc.data() as Propina).fechaBaja === null).map(a => {
          const data = a.payload.doc.data() as Propina;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtener propina por id (id)
  obtenerPropina(uid: string) {
    return this.firebaseService.getDoc('propinas', uid).pipe(
      map((propina: any) => {
        const data = propina.payload.data() as Propina;
        const id = uid;
        return { id, ...data };
      })
    );
  }

  // Crear Propina (Class Propina)
  crearPropina(propina: Propina) {
    propina.fechaAlta = new Date();
    return this.firebaseService.addDoc('propinas', Object.assign({}, propina));
  }

  // Actualizar propinas (Class Propina)
  actualizarPropina(propina: Propina) {
    propina.fechaModificado = new Date();
    return this.firebaseService.updateDoc('propinas', propina.id, Object.assign({}, propina));
  }

  // Borrar Propina (id)
  // Realizamos baja logica de la propina
  borrarPropina(propina: Propina) {
    propina.fechaBaja = new Date();
    return this.firebaseService.updateDoc('propinas', propina.id, Object.assign({}, propina));
  }
}
