import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SolicitudInviernoPage } from "./solicitud-invierno.page";

const routes: Routes = [
  {
    path: "",
    component: SolicitudInviernoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudInviernoPageRoutingModule {}
