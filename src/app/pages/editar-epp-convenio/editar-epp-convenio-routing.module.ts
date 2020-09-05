import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarEppConvenioPage } from './editar-epp-convenio.page';

const routes: Routes = [
  {
    path: '',
    component: EditarEppConvenioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarEppConvenioPageRoutingModule {}
