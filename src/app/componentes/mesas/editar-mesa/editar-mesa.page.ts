import { Component, OnInit, Input } from '@angular/core';
import { Mesa } from 'src/app/clases/mesa';
import { ModalController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TipoMesa } from 'src/app/enums/tipo-mesa.enum';
import { UtilsService } from 'src/app/servicios/utils.service';
import { MesaService } from 'src/app/servicios/mesa.service';
import { CameraService } from 'src/app/servicios/camera.service';

@Component({
  selector: 'app-editar-mesa',
  templateUrl: './editar-mesa.page.html',
  styleUrls: ['./editar-mesa.page.scss'],
})
export class EditarMesaPage implements OnInit {

  @Input() mesa: Mesa;
  @Input() callback: any;
  public formMesa: FormGroup;
  public tipoMesa = Object.values(TipoMesa).filter(unTipo => typeof unTipo === 'string');

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    public mesaService: MesaService,
    private camera: CameraService
  ) {
    this.formMesa = this.fb.group({
      numeroMesa: ['', Validators.compose([Validators.required, Validators.min(1)])],
      cantidadComensales: ['', Validators.compose([Validators.required, Validators.min(2)])],
      tipoMesa: ['', Validators.compose([Validators.required])],
      foto: ['']
    });
  }

  ngOnInit() {
    console.log(this.mesa);
    this.formMesa.controls.numeroMesa.setValue(this.mesa.numero);
    this.formMesa.controls.cantidadComensales.setValue(this.mesa.cantidad);
    this.formMesa.controls.tipoMesa.setValue(this.mesa.tipo);
    this.formMesa.controls.foto.setValue(this.mesa.foto);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmitMesa(): void {
    if (this.formMesa.valid) {
      this.utilsService.presentLoading();

      this.mesa.numero = this.formMesa.controls.numeroMesa.value;
      this.mesa.cantidad = this.formMesa.controls.cantidadComensales.value;
      this.mesa.tipo = this.formMesa.controls.tipoMesa.value;

      this.mesa.foto = this.formMesa.controls.foto.value;

      this.callback(this.mesa)
        .then(mesa => {
          console.log('Mesa editada ' + mesa);
          this.utilsService.dismissLoading();
          this.dismiss();
          this.utilsService.presentToast('Mesa editada', 'toast-info');
        })
        .catch(error => {
          this.utilsService.dismissLoading();
          this.utilsService.handleError(error);
        });
    } else {
      // alert('Error en formulario');
      this.formMesa.markAllAsTouched();
    }
  }

  public mostrarError(control: string): string {
    let retorno = '';

    switch (control) {
      case 'numeroMesa':
        if (this.formMesa.controls.numeroMesa.hasError('required')) {
          retorno = 'Debe ingresar un número de mesa';
        } else if (this.formMesa.controls.numeroMesa.hasError('min')) {
          retorno = 'Solamente se admiten números positivos';
        } else {
          retorno = 'Error inesperado con el número de mesa';
        }
        break;
      case 'cantidadComensales':
        if (this.formMesa.controls.cantidadComensales.hasError('required')) {
          retorno = 'Debe ingresar la cantidad de comensales admitidos';
        } else if (this.formMesa.controls.cantidadComensales.hasError('min')) {
          retorno = 'El mínimo de comensales es 2';
        } else {
          retorno = 'Error inesperado con la cantidad de comensales';
        }
        break;
      case 'tipoMesa':
        if (this.formMesa.controls.tipoMesa.hasError('required')) {
          retorno = 'Debe ingresar el tipo de mesa';
        } else {
          retorno = 'Error inesperado con el tipo de mesa';
        }
        break;
    }

    return retorno;
  }

  tomarFotoAltaMesas(): void {
    this.camera.tomarFoto().then(data => {
      this.formMesa.controls.foto.setValue(data);
    });
  }
}
