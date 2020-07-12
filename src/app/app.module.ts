// import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { DatePipe } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire'; // PATO
// import { AngularFireModule } from 'angularfire2'; // AGREGO LUCAS

import { environment } from '../environments/environment';
//
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore'; // PATO
// import { AngularFirestoreModule } from 'angularfire2/firestore'; // AGREGO LUCAS
//
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { HomeComponent } from './componentes/home/home.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ToolbarModule } from './componentes/toolbar/toolbar.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatModule } from './componentes/chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InicioComponent // PATO
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // PATO
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ToolbarModule, // PATO
    ChatModule, // PATO
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SETTINGS, useValue: {} }, // PATO
    Vibration,
    Camera,
    WebView, // PATO
    DatePipe, // PATO
    BarcodeScanner
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
