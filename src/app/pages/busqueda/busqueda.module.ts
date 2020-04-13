import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BusquedaPageRoutingModule } from "./busqueda-routing.module";

import { BusquedaPage } from "./busqueda.page";

import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BusquedaPage]
})
export class BusquedaPageModule {}
