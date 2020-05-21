import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SolicitudVeranoPageRoutingModule } from "./solicitud-verano-routing.module";

import { SolicitudVeranoPage } from "./solicitud-verano.page";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudVeranoPageRoutingModule,
    PipesModule,
  ],
  declarations: [SolicitudVeranoPage],
})
export class SolicitudVeranoPageModule {}
