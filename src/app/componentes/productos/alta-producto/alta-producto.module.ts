import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AltaProductoPageRoutingModule } from './alta-producto-routing.module';

import { AltaProductoPage } from './alta-producto.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToolbarModule } from '../../toolbar/toolbar.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ToolbarModule,
    AltaProductoPageRoutingModule
  ],
  declarations: [AltaProductoPage]
})
export class AltaProductoPageModule {}
