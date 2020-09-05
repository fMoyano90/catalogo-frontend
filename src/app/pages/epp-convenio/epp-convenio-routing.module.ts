import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EppConvenioPage } from './epp-convenio.page';

const routes: Routes = [
  {
    path: '',
    component: EppConvenioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EppConvenioPageRoutingModule {}
