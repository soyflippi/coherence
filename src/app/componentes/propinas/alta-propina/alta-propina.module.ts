import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaPropinaPageRoutingModule } from './alta-propina-routing.module';

import { AltaPropinaPage } from './alta-propina.page';

import { ToolbarModule } from '../../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ToolbarModule,
    AltaPropinaPageRoutingModule
  ],
  declarations: [AltaPropinaPage]
})
export class AltaPropinaPageModule {}
