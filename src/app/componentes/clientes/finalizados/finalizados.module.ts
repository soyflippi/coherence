import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizadosPageRoutingModule } from './finalizados-routing.module';

import { FinalizadosPage } from './finalizados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizadosPageRoutingModule
  ],
  declarations: [FinalizadosPage]
})
export class FinalizadosPageModule {}
