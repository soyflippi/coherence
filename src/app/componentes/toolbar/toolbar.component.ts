import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { AuthService } from '../../servicios/auth.service';
import { UtilsService } from '../../servicios/utils.service';
import { NotificationService } from '../../servicios/notification.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() titulo: string;
  @Input() backBtn: string;
  @Input() usuario: Usuario;
  @Input() notificaciones: boolean;

  constructor(
    public usuarioService: UsuarioService,
    private authService: AuthService,
    private utilsService: UtilsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {}

  logOut(): void {
    this.authService.logout();
    localStorage.removeItem('perfil');
    try{
      this.notificationService.desactivarNotificaciones();
    }
    catch(error)
    {
      console.log(error);
    }
    
    this.utilsService.showLoadingAndNavigate('inicio');
  }

  goToNotificaciones():void {
    this.utilsService.showLoadingAndNavigate('notificaciones');
  }
}
