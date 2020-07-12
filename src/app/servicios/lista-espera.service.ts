import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/internal/operators/map';
import { ListaEspera } from '../clases/lista-espera';

@Injectable({
  providedIn: 'root'
})
export class ListaEsperaService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene lista de espera
  obtenerLista() {
    return this.firebaseService.getDocs('lista_espera').pipe(
      map(list => {
        return list.map(a => {
          const data = a.payload.doc.data() as ListaEspera;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtener usuario en la lista de espera
  obtenerUsuario(uid: string) {
    return this.firebaseService.getDocs('lista_espera').pipe(
      map(lista => {
        // Buscamos al usuario en la lista de espera
        return lista.filter((m) => (m.payload.doc.data() as ListaEspera).usuario?.id === uid)
          .map(a => {
            const data = a.payload.doc.data() as ListaEspera;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
      })
    );
  }

  // Agregar a la lista
  agregarALista(lista: ListaEspera) {
    return this.firebaseService.addDoc('lista_espera', Object.assign({}, lista));
  }

  // Quitamos de la lista
  quitarDeLista(lista: ListaEspera) {
    return this.firebaseService.deleteDoc('lista_espera', lista.id);
  }
}
