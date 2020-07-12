import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from 'src/app/clases/usuario';
import { FirebaseService } from 'src/app/servicios/firebase.service';
import { NotificationService } from 'src/app/servicios/notification.service'; 
import { Notificacion } from 'src/app/clases/notificacion';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  usuario: Usuario = null;
  listaAux: any;
  listaNotificaciones: any[] = [];

  constructor(
    public notificatioService: NotificationService,
    private utilsService: UtilsService,
    private authService: AuthService,
    private fireService : FirebaseService) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.obtenerNotificaciones();
      });
    });
  }

  obtenerNotificaciones()
  {
    this.utilsService.presentLoading();
    this.notificatioService.obtenerNotificaciones().subscribe(notificaciones => {
      this.utilsService.dismissLoading();
      this.listaAux = notificaciones;
      this.listaNotificaciones = this.filtrarSegunPerfil();
    }, error => console.log(error));
  }

  filtrarSegunPerfil()
  {
    return this.listaAux.filter(notificacion => notificacion.receptor == this.usuario.perfil);
  }

}
