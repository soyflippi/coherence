import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropinasPageRoutingModule } from './propinas-routing.module';

import { PropinasPage } from './propinas.page';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarModule,
    PropinasPageRoutingModule
  ],
  declarations: [PropinasPage]
})
export class PropinasPageModule {}
