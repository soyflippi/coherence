import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/internal/operators/map';
import { Pedido } from '../clases/pedido';
import { Usuario } from '../clases/usuario';
import { EstadoPedido } from '../enums/estado-pedido.enum';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene todos los pedidos
  obtenerPedidos() {
    return this.firebaseService.getDocs('pedidos').pipe(
      map(pedido => {
        return pedido.map(a => {
          const data = a.payload.doc.data() as Pedido;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtiene los pedidos pendientes
  obtenerPedidosPendientes() {
    return this.firebaseService.getDocs('pedidos').pipe(
      map(pedido => {
        return pedido.filter((p) => (p.payload.doc.data() as Pedido).estado === EstadoPedido.PENDIENTE)
          .map(a => {
            const data = a.payload.doc.data() as Pedido;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
      })
    );
  }


  // Obtiene los pedidos confirmados
  obtenerPedidosConfirmados() {
    return this.firebaseService.getDocs('pedidos').pipe(
      map(pedido => {
        return pedido.filter((p) => (p.payload.doc.data() as Pedido).estado === EstadoPedido.CONFIRMADO)
          .map(a => {
            const data = a.payload.doc.data() as Pedido;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
      })
    );
  }

  // Obtiene los pedidos activos por usuario
  obtenerPedidosActivos(usr: Usuario) {
    return this.firebaseService.getDocQuery('pedidos', 'usuario.id', true, usr.id).pipe(
      map(pedido => {
        return pedido.filter((p) => (p.payload.doc.data() as Pedido).estado !== EstadoPedido.TERMINADO)
          .map(a => {
            const data = a.payload.doc.data() as Pedido;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
      })
    );
  }

  // Obtiene los pedidos finalizados por usuario
  obtenerPedidosFinalizados(usr: Usuario) {
    return this.firebaseService.getDocQuery('pedidos', 'usuario.id', true, usr.id).pipe(
      map(pedido => {
        return pedido.filter((p) => (p.payload.doc.data() as Pedido).estado === EstadoPedido.TERMINADO)
          .map(a => {
            const data = a.payload.doc.data() as Pedido;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
      })
    );
  }

    // Obtiene los pedidos por cobrar
    obtenerPedidosPorCobrar() {
      return this.firebaseService.getDocs('pedidos').pipe(
        map(pedido => {
          return pedido.filter((p) => (p.payload.doc.data() as Pedido).estado === EstadoPedido.PAGANDO)
            .map(a => {
              const data = a.payload.doc.data() as Pedido;
              const id = a.payload.doc.id;
              return { id, ...data };
            });
        })
      );
    }

  // Obtener Pedido por id (id)
  obtenerPedido(uid: string) {
    return this.firebaseService.getDoc('pedidos', uid).pipe(
      map((pedido: any) => {
        const data = pedido.payload.data() as Pedido;
        const id = uid;
        return { id, ...data };
      })
    );
  }

  // Crear pedido (Class Pedido)
  crearPedido(pedido: Pedido) {
    pedido.fechaAlta = new Date();
    return this.firebaseService.addDoc('pedidos', Object.assign({}, pedido));
  }

  // Actualizar pedidos (Class pedido)
  actualizarPedido(pedido: Pedido) {
    pedido.fechaModificado = new Date();
    return this.firebaseService.updateDoc('pedidos', pedido.id, Object.assign({}, pedido));
  }

  // Borrar Pedido (id)
  // Realizamos baja logica del pedido
  borrarPedido(pedido: Pedido) {
    pedido.fechaBaja = new Date();
    return this.firebaseService.updateDoc('pedidos', pedido.id, Object.assign({}, pedido));
  }
}
