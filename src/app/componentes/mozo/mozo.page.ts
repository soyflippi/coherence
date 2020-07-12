import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { PedidoService } from '../../servicios/pedido.service';
import { UtilsService } from '../../servicios/utils.service';
import { Usuario } from 'src/app/clases/usuario';
import { Pedido } from 'src/app/clases/pedido';
import { EstadoPedido } from '../../enums/estado-pedido.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage implements OnInit, OnDestroy {
  usuario: Usuario = null;
  private pedidosPendientes: Pedido[];
  private desuscribir = new Subject<void>();

  constructor(
    private authService: AuthService,
    private pedidos: PedidoService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;

        this.pedidos.obtenerPedidos()
        .pipe(takeUntil(this.desuscribir))
        .subscribe(call => this.pedidosPendientes = call.filter(c2 => c2.estado !== EstadoPedido.TERMINADO));
      });
    });
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
  }

  getPendientes() {
    return this.pedidosPendientes;
  }

  chatear(pedidoActivo: Pedido, destinatario: string) {
    this.utilsService.presentModal(ChatComponent, { pedido: pedidoActivo, receptor: destinatario, user: this.usuario });
  }
}
