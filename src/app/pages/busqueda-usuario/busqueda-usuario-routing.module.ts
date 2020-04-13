import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaUsuarioPage } from './busqueda-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaUsuarioPageRoutingModule {}
