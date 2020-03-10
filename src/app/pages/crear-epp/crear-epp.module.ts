import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CrearEppPageRoutingModule } from "./crear-epp-routing.module";

import { CrearEppPage } from "./crear-epp.page";

import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    CrearEppPageRoutingModule
  ],
  declarations: [CrearEppPage]
})
export class CrearEppPageModule {}
