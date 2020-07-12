import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { EditarMesaPageRoutingModule } from './editar-mesa-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EditarMesaPage } from './editar-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditarMesaPageRoutingModule
  ],
  declarations: [EditarMesaPage]
})
export class EditarMesaPageModule {}
