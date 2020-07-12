import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NivelSatisfaccion } from 'src/app/enums/nivel-satisfaccion.enum';
import { Propina } from 'src/app/clases/propina';
import { PropinaService } from 'src/app/servicios/propina.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-alta-propina',
  templateUrl: './alta-propina.page.html',
  styleUrls: ['./alta-propina.page.scss'],
})
export class AltaPropinaPage implements OnInit {
  public formPropina: FormGroup;

  // https://stackoverflow.com/questions/56036446/typescript-enum-values-as-array
  // https://stackoverflow.com/questions/35546421/how-to-get-a-variable-type-in-typescript
  public nivelSatisfaccion = Object.values(NivelSatisfaccion).filter(unTipo => typeof unTipo === 'string');
  private propina: Propina = new Propina();

  constructor(
    private fb: FormBuilder,
    private propinas: PropinaService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.formPropina = this.fb.group({
      porcentajePropina: ['', Validators.compose([Validators.required, Validators.min(0)])],
      nivelSatisfaccion: ['', Validators.compose([Validators.required])]
    });
  }

  public volverHome(): void {
    this.utilsService.showLoadingAndNavigate('home');
  }

  onSubmitPropina(): void {
    if (this.formPropina.valid) {
      this.utilsService.presentLoading();
      this.propina.porcentaje = this.formPropina.controls.porcentajePropina.value;
      this.propina.satisfaccion = this.formPropina.controls.nivelSatisfaccion.value;
      // alert('Envío Propina');
      this.propinas.crearPropina(this.propina)
        .then(nuevaPropina => {
          this.formPropina.reset();

          this.propina = new Propina();

          this.utilsService.dismissLoading();
          this.utilsService.presentToast('Propina creada', 'toast-success');
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
