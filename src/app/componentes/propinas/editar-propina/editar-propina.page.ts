import { Component, OnInit, Input } from '@angular/core';
import { Propina } from 'src/app/clases/propina';
import { ModalController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NivelSatisfaccion } from 'src/app/enums/nivel-satisfaccion.enum';
import { UtilsService } from 'src/app/servicios/utils.service';
import { PropinaService } from 'src/app/servicios/propina.service';

@Component({
  selector: 'app-editar-propina',
  templateUrl: './editar-propina.page.html',
  styleUrls: ['./editar-propina.page.scss'],
})
export class EditarPropinaPage implements OnInit {
  @Input() propina: Propina;
  @Input() callback: any;
  public formPropina: FormGroup;
  public nivelSatisfaccion = Object.values(NivelSatisfaccion).filter(unTipo => typeof unTipo === 'string');

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    public propinaService: PropinaService
  ) {
    this.formPropina = this.fb.group({
      porcentajePropina: ['', Validators.compose([Validators.required, Validators.min(0)])],
      nivelSatisfaccion: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    console.log(this.propina);
    this.formPropina.controls.porcentajePropina.setValue(this.propina.porcentaje);
    this.formPropina.controls.nivelSatisfaccion.setValue(this.propina.satisfaccion);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmitPropina(): void {
    if (this.formPropina.valid) {
      this.utilsService.presentLoading();

      this.propina.porcentaje = this.formPropina.controls.porcentajePropina.value;
      this.propina.satisfaccion = this.formPropina.controls.nivelSatisfaccion.value;

      this.callback(this.propina)
        .then(propina => {
          console.log('Propina editada ' + propina);
          this.utilsService.dismissLoading();
          this.dismiss();
          this.utilsService.presentToast('Propina editada', 'toast-info');
        })
        .catch(error => {
          this.utilsService.dismissLoading();
          this.utilsService.handleError(error);
        });
    } else {
      // alert('Error en formulario');
      this.formPropina.markAllAsTouched();
    }
  }

  public mostrarError(control: string): string {
    let retorno = '';

    switch (control) {
      case 'porcentajePropina':
        if (this.formPropina.controls.porcentajePropina.hasError('required')) {
          retorno = 'Debe ingresar un porcentaje de propina';
        } else if (this.formPropina.controls.porcentajePropina.hasError('min')) {
          retorno = 'No se admiten porcentajes negativos';
        } else {
          retorno = 'Error inesperado con el porcentaje de propina';
        }
        break;
      case 'nivelSatisfaccion':
        if (this.formPropina.controls.nivelSatisfaccion.hasError('required')) {
          retorno = 'Debe ingresar el nivel de satisfacción';
        } else {
          retorno = 'Error inesperado con el nivel de satisfacción';
        }
        break;
    }

    return retorno;
  }
}
