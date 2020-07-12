import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesasPageRoutingModule } from './mesas-routing.module';

import { MesasPage } from './mesas.page';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    MesasPageRoutingModule
  ],
  declarations: [MesasPage]
})
export class MesasPageModule {}
