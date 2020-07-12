import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.page.html',
  styleUrls: ['./finalizados.page.scss'],
})
export class FinalizadosPage implements OnInit {

  usuario: any;
  pedidos = null;

  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.obtenerPedidos();
      });
    });
  }

  obtenerPedidos() {
    this.utilsService.presentLoading();
    this.pedidoService.obtenerPedidosFinalizados(this.usuario).subscribe(pedidos => {
      this.utilsService.dismissLoading();
      this.pedidos = pedidos;
    });
  }

  atras(): void {
    this.utilsService.showLoadingAndNavigate('clientes');
  }

  calcularTotal(ped) {
    return ped.productos.reduce((a, b) => a + b.cantidad * b.producto.precio, 0);
  }
}
