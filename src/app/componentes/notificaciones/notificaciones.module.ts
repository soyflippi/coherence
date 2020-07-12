import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotificacionesPageRoutingModule } from './notificaciones-routing.module';
import { NotificacionesPage } from './notificaciones.page';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionesPageRoutingModule,
    ToolbarModule
  ],
  declarations: [NotificacionesPage]
})
export class NotificacionesPageModule {}
