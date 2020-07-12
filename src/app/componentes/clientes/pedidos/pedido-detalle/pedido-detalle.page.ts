import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido';
import { ModalController } from '@ionic/angular';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.page.html',
  styleUrls: ['./pedido-detalle.page.scss'],
})
export class PedidoDetallePage implements OnInit {

  @Input() pedido: Pedido;
  @Input() callback: any;


  constructor(
    private modalCtrl: ModalController,
    public productoService: ProductoService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  pagarPedido() {
    this.callback(this.pedido);
    this.dismiss();
  }

  calcularTotal() {
    return this.pedido.productos.reduce((a, b) => a + b.cantidad * b.producto.precio, 0);
  }

  calcularPropina() {
    try {
      return this.calcularTotal() * (this.pedido.propina.porcentaje / 100);
    } catch (error) {
      return 0;
    }
  }

  calcularTotalFinal() {
    return this.calcularTotal() + this.calcularPropina();
  }
}
