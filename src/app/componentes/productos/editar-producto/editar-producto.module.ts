import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditarProductoPageRoutingModule } from './editar-producto-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditarProductoPage } from './editar-producto.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditarProductoPageRoutingModule
  ],
  declarations: [EditarProductoPage]
})
export class EditarProductoPageModule {}
