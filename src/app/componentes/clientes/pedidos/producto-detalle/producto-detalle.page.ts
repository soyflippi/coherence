import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Producto } from 'src/app/clases/producto';
import { Pedido } from 'src/app/clases/pedido';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
})
export class ProductoDetallePage implements OnInit, AfterViewInit {
  @ViewChild('slideFotos', { static: false }) slideFotos: IonSlides;
  public didInit = false;

  @Input() producto: Producto;
  @Input() pedido: Pedido;
  @Input() callback: any;

  slider: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  cantidad = 0;

  constructor(
    private modalCtrl: ModalController
  ) {
    this.slider =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: []
    };
  }

  incrementar() {
    this.cantidad++;
  }

  decrementar() {
    if (this.cantidad > 0) { this.cantidad--; }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.didInit = true;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  agregarProducto() {
    if (this.cantidad > 0) {
      const prod = { cantidad: this.cantidad, producto: this.producto, terminado: false };
      if (!this.pedido.productos) { this.pedido.productos = []; } // Si no existe productos lo creamos
      if (this.pedido.productos.some(produ => produ.producto.id === this.producto.id)) {
        // Si existe el producto sumamos la cantidad
        const prodIndex = this.pedido.productos.findIndex(x => x.producto.id === this.producto.id);
        this.pedido.productos[prodIndex].cantidad++;
      } else {
        // Si no existe lo agregamos
        this.pedido.productos.push(prod);
      }

      this.callback(this.pedido);
      this.dismiss();
    }
  }

}
