import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarUsuarioPage } from './actualizar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarUsuarioPageRoutingModule {}
