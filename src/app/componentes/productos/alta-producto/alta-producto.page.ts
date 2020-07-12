import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraService } from 'src/app/servicios/camera.service';
import { Producto } from 'src/app/clases/producto';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Sectores } from 'src/app/enums/sectores.enum';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {
  public formProducto: FormGroup;

  // https://stackoverflow.com/questions/56036446/typescript-enum-values-as-array
  // https://stackoverflow.com/questions/35546421/how-to-get-a-variable-type-in-typescript
  public sector = Object.values(Sectores).filter(unTipo => typeof unTipo === 'string');
  private producto: Producto = new Producto();
  private fotos: string[] = [];
  private muestraModal = false;
  private cantFotos = 3;
  private fotoActual = 0;

  constructor(
    public utilsService: UtilsService,
    private fb: FormBuilder,
    public camara: CameraService,
    private productos: ProductoService,
  ) { }

  ngOnInit() {
    this.formProducto = this.fb.group({
      codigo: ['', Validators.compose([Validators.required])],
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      descripcion: ['', Validators.compose([Validators.required])],
      sector: ['', Validators.compose([Validators.required])],
      tiempoPromedio: ['', Validators.compose([Validators.required, Validators.min(0)])],
      precio: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });
  }

  public volverHome(): void {
    this.utilsService.showLoadingAndNavigate('home');
  }

  public tomarFoto(): void {
    this.camara.tomarFoto()
      .then(unaFoto => this.fotos.push(unaFoto));
  }

  onSubmitProducto(): void {
    if (this.formProducto.valid && this.fotos.length === this.cantFotos) {
      this.utilsService.presentLoading();

      this.producto.codigo = this.formProducto.controls.codigo.value;
      this.producto.nombre = this.formProducto.controls.nombre.value;
      this.producto.descripcion = this.formProducto.controls.descripcion.value;
      this.producto.sector = this.formProducto.controls.sector.value;
      this.producto.tiempo = this.formProducto.controls.tiempoPromedio.value;
      this.producto.precio = this.formProducto.controls.precio.value;
      this.producto.fotos = this.fotos;

      this.productos.crearProducto(this.producto)
        .then(nuevoProd => {
          console.log('Producto creado ' + nuevoProd);
          this.formProducto.reset();
          this.fotos = [];
          this.producto = new Producto();

          this.utilsService.dismissLoading();
          this.utilsService.presentToast('Producto creado', 'toast-success');
        })
        .catch(error => {
          this.utilsService.dismissLoading();
          this.utilsService.handleError(error);
        });
    } else {
      if (this.fotos.length < this.cantFotos) {
        this.utilsService.presentToast(`Debe adjuntar ${this.cantFotos} fotos del producto`, 'toast-error');
      }
      // alert('Error en formulario');
      this.formProducto.markAllAsTouched();
    }
  }

  public mostrarError(control: string): string {
    let retorno = '';

    switch (control) {
      case 'codigo':
        if (this.formProducto.controls.codigo.hasError('required')) {
          retorno = 'Debe ingresar un código para el producto';
        } else {
          retorno = 'Error inesperado con el código del producto';
        }
        break;
      case 'nombre':
        if (this.formProducto.controls.nombre.hasError('required')) {
          retorno = 'Debe ingresar un nombre para el producto';
        } else if (this.formProducto.controls.nombre.hasError('minlength')) {
          retorno = 'Debe ingresar al menos 3 caracteres para el nombre';
        } else {
          retorno = 'Error inesperado con el nombre del producto';
        }
        break;
      case 'descripcion':
        if (this.formProducto.controls.descripcion.hasError('required')) {
          retorno = 'Debe ingresar una descripción para el producto';
        } else {
          retorno = 'Error inesperado con el descripción del producto';
        }
        break;
      case 'tiempoPromedio':
        if (this.formProducto.controls.tiempoPromedio.hasError('required')) {
          retorno = 'Debe ingresar el tiempo promedio de preparación';
        } else if (this.formProducto.controls.tiempoPromedio.hasError('min')) {
          retorno = 'No se admiten valores negativos';
        } else {
          retorno = 'Error inesperado con el tiempo promedio de preparación';
        }
        break;
      case 'precio':
        if (this.formProducto.controls.precio.hasError('required')) {
          retorno = 'Debe ingresar el precio del producto';
        } else if (this.formProducto.controls.precio.hasError('min')) {
          retorno = 'No se admiten valores negativos';
        } else {
          retorno = 'Error inesperado con el precio del producto';
        }
        break;
      case 'sector':
        if (this.formProducto.controls.sector.hasError('required')) {
          retorno = 'Debe ingresar el sector';
        } else {
          retorno = 'Error inesperado con el sector';
        }
        break;
    }

    return retorno;
  }

  public getCantFotos(): number {
    return this.cantFotos;
  }

  public base64ToImg(num: number): string {
    return this.fotos[num] ? this.camara.base64ToImg(this.fotos[num]) : '';
  }

  public getFoto(num: number): string {
    return this.fotos[num];
  }

  public getFotos(): string[] {
    return this.fotos;
  }

  public getMuestraModal(): boolean {
    return this.muestraModal;
  }

  public setMuestraModal(muestra: boolean): void {
    this.muestraModal = muestra;
  }

  public getFotoActual(): number {
    return this.fotoActual;
  }

  public irFotoAnt(): void {
    if (this.fotoActual > 0) {
      this.fotoActual--;
    }
  }

  public irFotoSig(): void {
    if (this.fotoActual < this.fotos.length - 1) {
      this.fotoActual++;
    }
  }
}
