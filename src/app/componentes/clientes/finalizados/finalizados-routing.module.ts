import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizadosPage } from './finalizados.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizadosPageRoutingModule {}
