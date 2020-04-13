import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductosComponent } from "./productos/productos.component";
import { ProductoComponent } from "./producto/producto.component";
import { IonicModule } from "@ionic/angular";
import { PipesModule } from "../pipes/pipes.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ProductosComponent, ProductoComponent],
  exports: [ProductosComponent],
  imports: [CommonModule, IonicModule, PipesModule, RouterModule]
})
export class ComponentsModule {}
