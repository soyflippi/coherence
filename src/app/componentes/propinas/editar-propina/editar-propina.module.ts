import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPropinaPageRoutingModule } from './editar-propina-routing.module';

import { EditarPropinaPage } from './editar-propina.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditarPropinaPageRoutingModule
  ],
  declarations: [EditarPropinaPage]
})
export class EditarPropinaPageModule {}
