import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaUsuariosPageRoutingModule } from './alta-usuarios-routing.module';

import { AltaUsuariosPage } from './alta-usuarios.page';

import { ToolbarModule } from '../../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AltaUsuariosPageRoutingModule,
    ToolbarModule // PATO
  ],
  declarations: [AltaUsuariosPage]
})
export class AltaUsuariosPageModule {}
