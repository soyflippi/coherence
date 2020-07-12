import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesPage } from './clientes.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
  },
  {
    path: '',
    redirectTo: 'ClientesPage',
    pathMatch: 'full'
  },
  {
    path: 'lista-espera',
    loadChildren: () => import('./lista-espera/lista-espera.module').then( m => m.ListaEsperaPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'finalizados',
    loadChildren: () => import('./finalizados/finalizados.module').then( m => m.FinalizadosPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule { }
