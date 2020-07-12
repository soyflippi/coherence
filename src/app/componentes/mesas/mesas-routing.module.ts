import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesasPage } from './mesas.page';

const routes: Routes = [
  {
    path: '',
    component: MesasPage
  },
  {
    path: 'alta-mesa',
    loadChildren: () => import('./alta-mesa/alta-mesa.module').then(m => m.AltaMesaPageModule)
  },
  {
    path: 'editar-mesa',
    loadChildren: () => import('./editar-mesa/editar-mesa.module').then( m => m.EditarMesaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesasPageRoutingModule { }
