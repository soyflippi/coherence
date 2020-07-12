import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Pedido } from '../../clases/pedido';
import { Usuario } from '../../clases/usuario';
import { PedidoService } from '../../servicios/pedido.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  @Input() pedido: Pedido;
  @Input() receptor: string;
  @Input() user: Usuario;
  public msg: string;
  loading = false;
  index = null;
  public listaMensajes: any[];
  private desuscribir = new Subject<void>();

  constructor(
    private pedidos: PedidoService,
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.loading = true;
    this.pedidos.obtenerPedido(this.pedido.id)
    .pipe(takeUntil(this.desuscribir))
    .subscribe(call => {
      this.loading = false;
      this.listaMensajes = call.mensajes;
    });
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
  }

  closeModal() {
    this.modal.dismiss();
  }

  sendMensaje() {
    if (this.msg.trim() !== '') {
      const message = {
        text: this.msg,
        created_at: new Date(),
        user: {
          id: this.user.id,
          nombre: this.user.nombre
        },
        destinatario: this.receptor
      };
      if (!this.listaMensajes) {
        this.listaMensajes = [];
      }
      this.listaMensajes.push(message);
      this.pedido.mensajes = this.listaMensajes;
      this.content.scrollToBottom(0);
      this.pedidos.actualizarPedido(this.pedido);
      this.msg = '';
    }
  }

  updateScroll(index: any) {
    if (index !== this.index) {
      this.index = index;
      setTimeout(() => {
        this.content.scrollToBottom(0);
      }, 1000);
    }
  }

  getFecha(fecha: any) {
    return fecha instanceof Date ? fecha : fecha.toDate();
  }
}
