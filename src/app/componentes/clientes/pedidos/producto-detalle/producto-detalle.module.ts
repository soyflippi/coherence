import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoDetallePageRoutingModule } from './producto-detalle-routing.module';

import { ProductoDetallePage } from './producto-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoDetallePageRoutingModule
  ],
  declarations: [ProductoDetallePage]
})
export class ProductoDetallePageModule {}
