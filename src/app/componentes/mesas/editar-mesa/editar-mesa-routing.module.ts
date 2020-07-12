import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarMesaPage } from './editar-mesa.page';

const routes: Routes = [
  {
    path: '',
    component: EditarMesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarMesaPageRoutingModule {}
