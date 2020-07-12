import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMesa } from 'src/app/enums/tipo-mesa.enum';
import { CameraService } from 'src/app/servicios/camera.service';
import { Mesa } from 'src/app/clases/mesa';
import { MesaService } from 'src/app/servicios/mesa.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit {
  public formMesa: FormGroup;

  // https://stackoverflow.com/questions/56036446/typescript-enum-values-as-array
  // https://stackoverflow.com/questions/35546421/how-to-get-a-variable-type-in-typescript
  public tipoMesa = Object.values(TipoMesa).filter(unTipo => typeof unTipo === 'string');
  private mesa: Mesa = new Mesa();
  private foto = '';
  private muestraModal = false;

  constructor(
    private fb: FormBuilder,
    public camara: CameraService,
    private mesas: MesaService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.formMesa = this.fb.group({
      numeroMesa: ['', Validators.compose([Validators.required, Validators.min(1)])],
      cantidadComensales: ['', Validators.compose([Validators.required, Validators.min(2)])],
      tipoMesa: ['', Validators.compose([Validators.required])]
    });
  }

  public volverHome(): void {
    this.utilsService.showLoadingAndNavigate('home');
  }

  public tomarFoto(): void {
    this.camara.tomarFoto()
      .then(unaFoto => this.foto = unaFoto);
  }

  onSubmitMesa(): void {
    if (this.formMesa.valid) {
      this.utilsService.presentLoading();
      this.mesa.numero = this.formMesa.controls.numeroMesa.value;
      this.mesa.cantidad = this.formMesa.controls.cantidadComensales.value;
      this.mesa.tipo = this.formMesa.controls.tipoMesa.value;
      this.mesa.foto = this.foto;
      // alert('Envío Mesa');
      this.mesas.crearMesa(this.mesa)
        .then(nuevaMesa => {
          this.formMesa.reset();
          this.foto = '';

          this.mesa = new Mesa();

          this.utilsService.dismissLoading();
          this.utilsService.presentToast('Mesa creada', 'toast-success');
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

  public base64ToImg(): string {
    return this.foto ? this.camara.base64ToImg(this.foto) : '';
  }

  public getFoto(): string {
    return this.foto;
  }

  public getMuestraModal(): boolean {
    return this.muestraModal;
  }

  public setMuestraModal(muestra: boolean): void {
    this.muestraModal = muestra;
  }
}
