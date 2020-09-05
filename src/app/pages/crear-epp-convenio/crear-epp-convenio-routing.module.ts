import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearEppConvenioPage } from './crear-epp-convenio.page';

const routes: Routes = [
  {
    path: '',
    component: CrearEppConvenioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearEppConvenioPageRoutingModule {}
