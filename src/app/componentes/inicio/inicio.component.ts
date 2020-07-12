import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { EstadoUsuario } from 'src/app/enums/estado-usuario.enum';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.authService.isLoggedIn().then(auth => {
      console.log(auth);
      if (auth) {
        // Si esta logeuado lo redireccionamos
        this.authService.obtenerDetalle(auth).subscribe(usuario => {
          console.log(usuario);
          if (usuario.estado === EstadoUsuario.APROBADO) {
            if (usuario.perfil === TipoUsuario.CLIENTE_REGISTRADO || usuario.perfil === TipoUsuario.CLIENTE_ANONIMO) { // Clientes
              this.utilsService.showLoadingAndNavigate('clientes');
            } else { // Personal
              this.utilsService.showLoadingAndNavigate('home');
            }
          }
        });
      }
    });
  }

  manejadoraInicio(opcion: string): void {
    switch (opcion) {
      case 'CLIENTE_ANONIMO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.utilsService.showLoadingAndNavigate('usuarios/alta-usuarios');
        break;

      case 'CLIENTE_REGISTRADO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.utilsService.showLoadingAndNavigate('usuarios/alta-usuarios');
        break;

      case 'LOGIN':
        this.utilsService.showLoadingAndNavigate('login');
        break;
    }
  }
}
