import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CrearEppPage } from "./crear-epp.page";

const routes: Routes = [
  {
    path: "",
    component: CrearEppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearEppPageRoutingModule {}
