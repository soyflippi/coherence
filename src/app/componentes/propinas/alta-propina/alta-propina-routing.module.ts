import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaPropinaPage } from './alta-propina.page';

const routes: Routes = [
  {
    path: '',
    component: AltaPropinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaPropinaPageRoutingModule {}
