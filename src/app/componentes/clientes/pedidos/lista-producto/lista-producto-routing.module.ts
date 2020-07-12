import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaProductoPage } from './lista-producto.page';

const routes: Routes = [
  {
    path: '',
    component: ListaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaProductoPageRoutingModule {}
