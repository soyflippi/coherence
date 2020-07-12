import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AltaMesaPageRoutingModule } from './alta-mesa-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AltaMesaPage } from './alta-mesa.page';
import { ToolbarModule } from 'src/app/componentes/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AltaMesaPageRoutingModule,
    ToolbarModule
  ],
  declarations: [AltaMesaPage]
})
export class AltaMesaPageModule {}
