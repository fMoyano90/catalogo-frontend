import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudVeranoPage } from './solicitud-verano.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudVeranoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudVeranoPageRoutingModule {}
