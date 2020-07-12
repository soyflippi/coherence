import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesEsperaPageRoutingModule } from './clientes-espera-routing.module';

import { ClientesEsperaPage } from './clientes-espera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesEsperaPageRoutingModule
  ],
  declarations: [ClientesEsperaPage]
})
export class ClientesEsperaPageModule {}
