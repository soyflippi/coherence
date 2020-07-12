import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EditarUsuarioPageRoutingModule } from './editar-usuario-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditarUsuarioPage } from './editar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditarUsuarioPageRoutingModule
  ],
  declarations: [EditarUsuarioPage]
})
export class EditarUsuarioPageModule {}
