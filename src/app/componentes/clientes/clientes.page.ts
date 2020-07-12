import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  usuario: Usuario = null;
  pedidosActivos: any = [];

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    public barcodeScanner: BarcodeScanner,
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.obtenerPedidosActivos();
      });
    });
  }

  ionViewWillEnter() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
      });
    });
  }

  obtenerPedidosActivos() {
    this.utilsService.presentLoading();
    this.pedidoService.obtenerPedidosActivos(this.usuario).subscribe(datos => {
      this.utilsService.dismissLoading();
      this.pedidosActivos = datos;
      console.log(datos);
    });
  }

  logOut(): void {
    this.authService.logout();
    this.utilsService.showLoadingAndNavigate('inicio');
  }

  irListaEspera(): void {
    this.utilsService.showLoadingAndNavigate('clientes/lista-espera');
  }

  irPedidoActivo(): void {
    this.utilsService.showLoadingAndNavigate('clientes/pedidos');
  }

  irFinalizados(): void {
    this.utilsService.showLoadingAndNavigate('clientes/finalizados');
  }

  escanearQR(): void {
    this.barcodeScanner.scan({ formats: 'QR_CODE' }).then((data) => {
      if (data && !data.cancelled) {
        if (data.text === 'LISTA_DE_ESPERA') { // Si usa el QR de lista de espera lo llevamos a LE
          this.irListaEspera();
        }
        else if (this.pedidosActivos.length > 0 && data.text === this.pedidosActivos[0].mesa.id) {
          // Si tiene pedidos activos y coincide con el codigo de qr de la mesa asignada lo llevamo al pedido
          this.irPedidoActivo();
        } else {
          // No existe QR o no es de la mesa asignada
          this.utilsService.presentAlert('Lo sentimos', '', 'El código escaneado no existe o no es de la mesa asignada');
        }
      }
    }, (err) => this.utilsService.handleError(err));
  }

}
