import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaEppConvenioPage } from './busqueda-epp-convenio.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaEppConvenioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaEppConvenioPageRoutingModule {}
