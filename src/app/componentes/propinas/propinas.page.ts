import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';
import { PropinaService } from 'src/app/servicios/propina.service';
import { Propina } from 'src/app/clases/propina';
import { EditarPropinaPage } from './editar-propina/editar-propina.page';

@Component({
  selector: 'app-propinas',
  templateUrl: './propinas.page.html',
  styleUrls: ['./propinas.page.scss'],
})
export class PropinasPage implements OnInit {
  listaPropinas: any;

  constructor(
    public propinaService: PropinaService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.obtenerPropinas();
  }

  obtenerPropinas() {
    this.utilsService.presentLoading();
    this.propinaService.obtenerPropinas().subscribe(propinas => {
      this.utilsService.dismissLoading();
      console.log(propinas);
      this.listaPropinas = propinas.sort((a, b) => b.porcentaje - a.porcentaje);
    }, error => console.log(error));
  }

  agregarPropina() {
    this.utilsService.showLoadingAndNavigate('propinas/alta-propina');
  }

  editarPropina(propina: Propina) {
    const callback = (m: Propina) => this.propinaService.actualizarPropina(m);
    this.utilsService.presentModal(EditarPropinaPage, { propina, callback });
  }

  eliminarPropina(propina: Propina) {
    const callback = () => this.propinaService.borrarPropina(propina);
    this.utilsService.presentAlertConfirm('Atención', '¿Estás seguro que deseas borrar esta propina?', callback);
  }
}
