import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SolicitudInviernoPageRoutingModule } from "./solicitud-invierno-routing.module";

import { SolicitudInviernoPage } from "./solicitud-invierno.page";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudInviernoPageRoutingModule,
    PipesModule,
  ],
  declarations: [SolicitudInviernoPage],
})
export class SolicitudInviernoPageModule {}
