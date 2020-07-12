import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/clases/producto';
import { Sectores } from 'src/app/enums/sectores.enum';
import { Pedido } from 'src/app/clases/pedido';
import { ModalController } from '@ionic/angular';
import { ProductoDetallePage } from '../producto-detalle/producto-detalle.page';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.page.html',
  styleUrls: ['./lista-producto.page.scss'],
})
export class ListaProductoPage implements OnInit {
  listaProductos: any;
  listaComida: any;
  listaBebida: any;
  listaPostre: any;

  @Input() pedido: Pedido;

  constructor(
    private utilsService: UtilsService,
    private productoService: ProductoService,
    private modalCtrl: ModalController,
    private pedidoService: PedidoService
  ) { }


  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.utilsService.presentLoading();
    this.productoService.obtenerProductos().subscribe(prods => {
      this.utilsService.dismissLoading();
      console.log(prods);
      this.listaProductos = prods;
      this.listaComida = this.filtrarComida();
      this.listaBebida = this.filtrarBebida();
      this.listaPostre = this.filtrarPostre();
    }, error => console.log(error));
  }

  filtrarComida() {
    return this.listaProductos.filter((prod: Producto) => prod.sector === Sectores.COMIDAS);
  }

  filtrarBebida() {
    return this.listaProductos.filter((prod: Producto) => prod.sector === Sectores.BEBIDAS);
  }

  filtrarPostre() {
    return this.listaProductos.filter((prod: Producto) => prod.sector === Sectores.POSTRES);
  }

  verProducto(producto: Producto) {
    const callback = (p: Pedido) => this.pedidoService.actualizarPedido(p);
    this.utilsService.presentModal(ProductoDetallePage, { producto, pedido: this.pedido, callback });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  calcularTotal() {
    return this.pedido.productos.reduce((a, b) => a + b.cantidad * b.producto.precio, 0);
  }
}
