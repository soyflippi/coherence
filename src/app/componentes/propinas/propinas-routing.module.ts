import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropinasPage } from './propinas.page';

const routes: Routes = [
  {
    path: '',
    component: PropinasPage
  },
  {
    path: 'alta-propina',
    loadChildren: () => import('./alta-propina/alta-propina.module').then( m => m.AltaPropinaPageModule)
  },
  {
    path: 'editar-propina',
    loadChildren: () => import('./editar-propina/editar-propina.module').then( m => m.EditarPropinaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropinasPageRoutingModule {}
