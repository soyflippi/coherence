import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoDetallePage } from './producto-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoDetallePageRoutingModule {}
