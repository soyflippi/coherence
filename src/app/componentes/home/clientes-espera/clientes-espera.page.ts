import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ListaEsperaService } from 'src/app/servicios/lista-espera.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ListaEspera } from 'src/app/clases/lista-espera';
import { MesaService } from 'src/app/servicios/mesa.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { Pedido } from 'src/app/clases/pedido';
import { Mesa } from 'src/app/clases/mesa';
import { EstadosMesa } from 'src/app/enums/estado-mesa.enum';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-clientes-espera',
  templateUrl: './clientes-espera.page.html',
  styleUrls: ['./clientes-espera.page.scss'],
})
export class ClientesEsperaPage implements OnInit {
  usuario: any;
  listado: any;
  mesasLibres: any;
  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private listaEsperaService: ListaEsperaService,
    private usuarioService: UsuarioService,
    private mesaService: MesaService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.obtenerPendientes();
        this.obtenerMesasLibres();
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

  obtenerMesasLibres() {
    this.mesaService.obtenerMesasLibres().subscribe(listado => {
      this.mesasLibres = listado;
    });
  }

  obtenerPendientes() {
    this.utilsService.presentLoading();
    this.listaEsperaService.obtenerLista().subscribe(listado => {
      this.utilsService.dismissLoading();
      this.listado = listado;
    });
  }

  // El proceso de asignacion de mesa crea el pedido (con mesaId)
  // y cambia el estado de la mesa a ASIGNADA
  asignarMesa(lista: ListaEspera) {
    const mesasOpt = this.mesasLibres.map(m => {
      const d =
      {
        name: `mesa${m.numero}`,
        type: 'radio',
        label: `MESA #${m.numero}`,
        value: { mesa: m, usuario: lista.usuario, listaE: lista }
      };
      return d;
    });
    const callback = (data) => this.crearPedido(data);
    this.utilsService.presentAlertRadio('Mesa libres a asignar', mesasOpt, callback);

  }

  crearPedido(data) {
    const mesa = data.mesa as Mesa;
    const cliente = data.usuario as Usuario;
    const listaE = data.listaE as ListaEspera;

    // Creamos el pedido
    const pedido = new Pedido();

    pedido.mesa = { id: mesa.id, numero: mesa.numero };
    pedido.usuario = { id: cliente.id, nombre: cliente.nombre };

    this.utilsService.presentLoading();
    this.pedidoService.crearPedido(pedido).then(resp => {

      // Actualizamos el estado de la mesa luego de crear el pedido
      mesa.estado = EstadosMesa.ASIGNADA;
      this.mesaService.actualizarMesa(mesa);

      // Quitamos de la lista de espera
      this.listaEsperaService.quitarDeLista(listaE);

      this.utilsService.dismissLoading();

      this.utilsService.presentToast('Mesa asignada', 'toast-info');
    }).catch(e => this.utilsService.handleError(e));
  }

  atras(): void {
    this.utilsService.showLoadingAndNavigate('home');
  }

}
