import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedirProductosPageRoutingModule } from './pedir-productos-routing.module';

import { PedirProductosPage } from './pedir-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PedirProductosPageRoutingModule
  ],
  declarations: [PedirProductosPage]
})
export class PedirProductosPageModule {}
