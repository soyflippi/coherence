import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MozoPageRoutingModule } from './mozo-routing.module';

import { MozoPage } from './mozo.page';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MozoPageRoutingModule,
    ToolbarModule
  ],
  declarations: [MozoPage]
})
export class MozoPageModule {}
