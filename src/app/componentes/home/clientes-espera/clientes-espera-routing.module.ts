import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesEsperaPage } from './clientes-espera.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesEsperaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesEsperaPageRoutingModule {}
