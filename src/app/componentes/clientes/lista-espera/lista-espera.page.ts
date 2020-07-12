import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';
import { ListaEsperaService } from 'src/app/servicios/lista-espera.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ListaEspera } from 'src/app/clases/lista-espera';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NotificationService } from 'src/app/servicios/notification.service';
import { Notificacion } from 'src/app/clases/notificacion';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  usuario: any;
  pedido = null;

  constructor(
    private utilsService: UtilsService,
    private listaEsperaService: ListaEsperaService,
    private authService: AuthService,
    private pedidoService: PedidoService,
    private barcodeScanner: BarcodeScanner,
    public notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.obtenerEstado();
      });
    });
  }

  obtenerEstado() {
    this.utilsService.presentLoading();
    this.pedidoService.obtenerPedidosActivos(this.usuario).subscribe(pedidos => {
      this.utilsService.dismissLoading();
      if (pedidos && pedidos.length === 0) { // Si no tiene pedidos en cursos
        // Validamos lista de espera
        const subListE = this.listaEsperaService.obtenerUsuario(this.usuario.id).subscribe(lista => {
          if (lista && lista.length === 0) { // Si no esta en la lista de espera, lo agregamos
            this.agregarListaEspera();
          }
          subListE.unsubscribe();
        });
      } else { // Si tiene pedido en curso, le avisamos que ya tiene mesa asignada
        this.pedido = pedidos;
      }
    });
  }

  agregarListaEspera() {
    const listE = new ListaEspera();
    listE.usuario = { id: this.usuario.id, nombre: this.usuario.nombre, foto: this.usuario.foto };
    this.listaEsperaService.agregarALista(listE);
    const notificacion = new Notificacion();
    notificacion.mensaje = 'Nuevo cliente en la lista de espera';
    notificacion.receptor = TipoUsuario.METRE;
    this.notificationService.crearNotificacion(notificacion);
  }


  atras(): void {
    this.utilsService.showLoadingAndNavigate('clientes');
  }

  irPedidoActivo(): void {
    this.utilsService.showLoadingAndNavigate('clientes/pedidos');
  }

  escanearQR(): void {
    this.barcodeScanner.scan({ formats: 'QR_CODE' }).then((data) => {
      if (data && !data.cancelled) {
        if (this.pedido.length > 0 && data.text === this.pedido[0].mesa.id) {
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
