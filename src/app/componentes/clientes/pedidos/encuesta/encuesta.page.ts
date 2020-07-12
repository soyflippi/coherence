import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Pedido } from '../../../../clases/pedido';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {

  @Input() pedido: Pedido;
  @Input() callback: any;
  formEncuesta: any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    this.formEncuesta = this.fb.group({
      calidad: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10)])],
      servicio: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10)])],
      limpieza: ['', Validators.compose([Validators.required, Validators.min(1), Validators.max(10)])],
      comentarios: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    if (this.pedido.encuesta) {
      this.formEncuesta.controls.calidad.setValue(this.pedido.encuesta.calidad);
      this.formEncuesta.controls.servicio.setValue(this.pedido.encuesta.servicio);
      this.formEncuesta.controls.limpieza.setValue(this.pedido.encuesta.limpieza);
      this.formEncuesta.controls.comentarios.setValue(this.pedido.encuesta.comentarios);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmitEncuesta(): void {
    if (this.formEncuesta.valid) {
      this.pedido.encuesta = {
        calidad: this.formEncuesta.controls.calidad.value,
        servicio: this.formEncuesta.controls.servicio.value,
        limpieza: this.formEncuesta.controls.limpieza.value,
        comentarios: this.formEncuesta.controls.comentarios.value
      };

      this.callback(this.pedido);
      this.dismiss();
    } else {
      this.formEncuesta.markAllAsTouched();
    }
  }

  public mostrarError(control: string): string {
    let retorno = '';

    switch (control) {
      case 'calidad':
        if (this.formEncuesta.controls.calidad.hasError('required')) {
          retorno = 'Debe ingresar una calificación para la calidad';
        } else if (this.formEncuesta.controls.limpieza.hasError('min')) {
          retorno = 'No se admiten calificaciones por debajo de 1';
        } else if (this.formEncuesta.controls.limpieza.hasError('max')) {
          retorno = 'No se admiten calificaciones por encima de 10';
        } else {
          retorno = 'Error inesperado con la calificación de la calidad';
        }
        break;
      case 'servicio':
        if (this.formEncuesta.controls.servicio.hasError('required')) {
          retorno = 'Debe ingresar una calificación para el servicio';
        } else if (this.formEncuesta.controls.limpieza.hasError('min')) {
          retorno = 'No se admiten calificaciones por debajo de 1';
        } else if (this.formEncuesta.controls.limpieza.hasError('max')) {
          retorno = 'No se admiten calificaciones por encima de 10';
        } else {
          retorno = 'Error inesperado con la calificación del servicio';
        }
        break;
      case 'limpieza':
        if (this.formEncuesta.controls.limpieza.hasError('required')) {
          retorno = 'Debe ingresar una calificación para la limpieza';
        } else if (this.formEncuesta.controls.limpieza.hasError('min')) {
          retorno = 'No se admiten calificaciones por debajo de 1';
        } else if (this.formEncuesta.controls.limpieza.hasError('max')) {
          retorno = 'No se admiten calificaciones por encima de 10';
        } else {
          retorno = 'Error inesperado con la calificación de la limpieza';
        }
        break;
      case 'comentarios':
        if (this.formEncuesta.controls.comentarios.hasError('required')) {
          retorno = 'Debe ingresar algún comentario';
        } else {
          retorno = 'Error inesperado con el comentario';
        }
        break;
    }

    return retorno;
  }
}
