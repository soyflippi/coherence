import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController,
  ActionSheetController,
  ModalController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { FIREBASE_MENSAJES } from '../enums/firebase-errores';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loader: any;
  isLoading = false;
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  // Toast & Alerts

  async presentAlert(header: string, sub: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header,
      subHeader: sub,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message, cssClass) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
      position: 'top',
      animated: true,
      cssClass
    });
    await toast.present();
  }
  // FIN Toast & Alerts

  // Loadings

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: null,
      message: '<img src="../assets/spinner.png" class="loader">',
      cssClass: 'custom-loading',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async presentLoadingAuto(time?) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: null,
      duration: time || 2000,
      message: '<img src="../assets/spinner.png" class="loader">',
      cssClass: 'custom-loading',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async presentAlertConfirm(title: string, msg: string, callback: any) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Si',
          handler: () => {
            callback();
          }
        }
      ]
    });

    await alert.present();
  }

  // alerts Radio opcion

  async presentAlertRadio(title: string, opts: any, callback: any) {
    const alert = await this.alertCtrl.create({
      header: title,
      inputs: opts,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            callback(data);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  async showLoadingAndNavigate(route: string) {
    await this.presentLoadingAuto();
    this.router.navigate([route]);
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  // FIN Loadings

  // Errors
  async handleError(error, isFirebase = false): Promise<void> {
    if (isFirebase) { this.localizeErrorMap(error); }
    console.log(error);
    const alert = await this.alertCtrl.create({
      message: error.message,
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    await alert.present();
  }
  // FIN Errors

  // ActionSheets
  async presentActionsheet(data) {
    const actionSheet = await this.actionSheetCtrl.create(data);
    await actionSheet.present();
  }
  // FIN ActionSheets

  // Firebase errores
  localizeErrorMap(e?: Error & { code?: string }): Error {
    if (typeof e === 'object' && typeof e.code === 'string' && e.code in FIREBASE_MENSAJES) {
      e.message = (FIREBASE_MENSAJES as any)[e.code];
    }
    return e;
  }

  // MODAL
  async presentModal(page, data?) {
    const modal = await this.modalCtrl.create({
      component: page,
      componentProps: data
    });
    return await modal.present();
  }

  // Fechas

  tiempoFormateado(timestamp) {
    let time = new Date(timestamp.seconds * 1000) as any;
    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time).getTime();
        break;
      case 'object':
        if (time.constructor === Date) { time = time.getTime(); }
        break;
      default:
        time = +new Date().getTime();
    }
    const timeFormats = [
      [60, 'segundos', 1], // 60
      [120, 'hace 1 minuto', '1 minuto desde ahora'], // 60*2
      [3600, 'minutos', 60], // 60*60, 60
      [7200, 'hace 1 hora', '1 hour from now'], // 60*60*2
      [86400, 'horas', 3600], // 60*60*24, 60*60
      [172800, 'ayer', 'Tomorrow'], // 60*60*24*2
      [604800, 'dias', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'esta semana', 'semana proxima'], // 60*60*24*7*4*2
      [2419200, 'semanas', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'este mes', 'mes proximo'], // 60*60*24*7*4*2
      [29030400, 'meses', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'este año', 'año proximo'], // 60*60*24*7*4*12*2
      [2903040000, 'años', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'este siglo', 'proximo siglo'], // 60*60*24*7*4*12*100*2
      [58060800000, 'siglos', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    let seconds = (+new Date() - time) / 1000;
    let token = '';
    let listChoice = 1;

    if (seconds === 0) {
      return 'Recien';
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'desde ahora';
      listChoice = 2;
    }
    let i = 0;
    let format;
    // tslint:disable-next-line:no-conditional-assignment
    while (format = timeFormats[i++]) {
      if (seconds < format[0]) {
        if (typeof format[2] === 'string') {
          return format[listChoice];
        }
        else {
          return (token === '' ? 'Hace ' : '') + Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
      }
    }
    return time;
  }
}
