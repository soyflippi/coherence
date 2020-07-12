import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoDetallePage } from './pedido-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoDetallePageRoutingModule {}
