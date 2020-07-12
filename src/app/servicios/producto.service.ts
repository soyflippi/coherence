import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/internal/operators/map';
import { Producto } from '../clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene foto del producto o una default
  obtenerFoto(producto: Producto) {
    let foto = '../../../assets/defaultFoto.png';
    if (producto.fotos && producto.fotos.length > 0) {
      foto = 'data:image/jpeg;base64,' + producto.fotos[0];
    }
    return foto;
  }

  // Obtiene todos los productos
  obtenerProductos() {
    return this.firebaseService.getDocs('productos').pipe(
      map(prod => {
        // Solo productos que no esten dados de baja
        return prod.filter((p) => (p.payload.doc.data() as Producto).fechaBaja === null).map(a => {
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtener producto por id (id)
  obtenerProducto(uid: string) {
    return this.firebaseService.getDoc('productos', uid).pipe(
      map((prod: any) => {
        const data = prod.payload.data() as Producto;
        const id = uid;
        return { id, ...data };
      })
    );
  }

  // Crear producto (Class Producto)
  crearProducto(prod: Producto) {
    prod.fechaAlta = new Date();
    return this.firebaseService.addDoc('productos', Object.assign({}, prod));
  }

  // Actualizar productos (Class Producto)
  actualizarProducto(prod: Producto) {
    prod.fechaModificado = new Date();
    return this.firebaseService.updateDoc('productos', prod.id, Object.assign({}, prod));
  }

  // Borrar producto (id)
  // Realizamos baja logica del producto
  borrarProducto(prod: Producto) {
    prod.fechaBaja = new Date();
    return this.firebaseService.updateDoc('productos', prod.id, Object.assign({}, prod));
  }
}
