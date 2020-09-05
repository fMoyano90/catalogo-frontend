import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EditarSolicitudPage } from "./editar-solicitud.page";

const routes: Routes = [
  {
    path: "",
    component: EditarSolicitudPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarSolicitudPageRoutingModule {}
