import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPendientesPageRoutingModule } from './clientes-pendientes-routing.module';

import { ClientesPendientesPage } from './clientes-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClientesPendientesPageRoutingModule
  ],
  declarations: [ClientesPendientesPage]
})
export class ClientesPendientesPageModule {}