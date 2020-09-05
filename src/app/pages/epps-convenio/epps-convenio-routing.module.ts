import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EppsConvenioPage } from './epps-convenio.page';

const routes: Routes = [
  {
    path: '',
    component: EppsConvenioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EppsConvenioPageRoutingModule {}
