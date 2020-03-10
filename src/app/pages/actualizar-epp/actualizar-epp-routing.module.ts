import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarEppPage } from './actualizar-epp.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarEppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarEppPageRoutingModule {}
