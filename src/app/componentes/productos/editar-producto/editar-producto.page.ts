import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/clases/producto';
import { Sectores } from 'src/app/enums/sectores.enum';
import { UtilsService } from 'src/app/servicios/utils.service';
import { CameraService } from 'src/app/servicios/camera.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit, AfterViewInit {
  public didInit = false;

  @Input() producto: Producto;
  @Input() callback: any;
  @ViewChild('slideFotos', { static: false }) slideFotos: IonSlides;
  slider: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  formProducto: any;
  public sector = Object.values(Sectores).filter(unTipo => typeof unTipo === 'string');
  public fotos: string[] = [];

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private camera: CameraService
  ) {
    this.slider =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: []
    };

    this.formProducto = this.fb.group({
      codigo: ['', Validators.compose([Validators.required])],
      nombre: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      descripcion: ['', Validators.compose([Validators.required])],
      sector: ['', Validators.compose([Validators.required])],
      tiempoPromedio: ['', Validators.compose([Validators.required, Validators.min(0)])],
      precio: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });
  }

  ngAfterViewInit() {
    this.didInit = true;
  }

  ngOnInit() {
    console.log(this.producto);
    this.formProducto.controls.codigo.setValue(this.producto.codigo);
    this.formProducto.controls.nombre.setValue(this.producto.nombre);
    this.formProducto.controls.descripcion.setValue(this.producto.descripcion);
    this.formProducto.controls.sector.setValue(this.producto.sector);
    this.formProducto.controls.tiempoPromedio.setValue(this.producto.tiempo);
    this.formProducto.controls.precio.setValue(this.producto.precio);

    this.producto.fotos.forEach(unaFoto => this.fotos.push(unaFoto));
  }

  dismiss() {
    this.fotos = [];
    this.modalCtrl.dismiss();
  }

  // Slider
  // Move to Next slide
  slideNext(object: any, slideView: IonSlides) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Move to previous slide
  slidePrev(object: any, slideView: IonSlides) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  // Method called when slide is changed by drag or navigation
  SlideDidChange(object: any, slideView: IonSlides) {
    this.checkIfNavDisabled(object, slideView);
  }

  // Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object: any, slideView: IonSlides) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object: any, slideView: IonSlides) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object: any, slideView: IonSlides) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  // FORM

  onSubmitProducto(): void {
    if (this.formProducto.valid) {
      this.utilsService.presentLoading();

      this.producto.codigo = this.formProducto.controls.codigo.value;
      this.producto.nombre = this.formProducto.controls.nombre.value;
      this.producto.descripcion = this.formProducto.controls.descripcion.value;
      this.producto.sector = this.formProducto.controls.sector.value;
      this.producto.tiempo = this.formProducto.controls.tiempoPromedio.value;
      this.producto.precio = this.formProducto.controls.precio.value;

      this.fotos.forEach((unaFoto, indice) => this.producto.fotos[indice] = unaFoto);

      this.callback(this.producto)
        .then(prod => {
          console.log('Producto editado ' + prod);
          this.utilsService.dismissLoading();
          this.dismiss();
          this.utilsService.presentToast('Producto editado', 'toast-info');
        })
        .catch(error => {
          this.utilsService.dismissLoading();
          this.utilsService.handleError(error);
        });
    } else {
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

  slideUpdate(slideView: IonSlides) {
    slideView.update();
  }

  tomarFotoAltaProductos(): void {
    this.camera.tomarFoto().then(data => {
      this.slideFotos.getActiveIndex().then(indice => {
        this.fotos[indice] = data;
      });
    });
  }
}
