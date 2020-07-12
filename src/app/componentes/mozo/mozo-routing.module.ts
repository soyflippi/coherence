import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MozoPage } from './mozo.page';

const routes: Routes = [
  {
    path: '',
    component: MozoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MozoPageRoutingModule {}
