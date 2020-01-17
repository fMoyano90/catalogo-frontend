import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../../services/productos.service";
import { Producto } from "../../interfaces/interfaces";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  productos: Producto[] = [];
  habilitado: boolean = true;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.siguientes();
  }

  recargar(event: any) {
    this.siguientes(event, true);
  }

  siguientes(event?: any, pull: boolean = false) {
    this.productosService.getProductos(pull).subscribe(resp => {
      console.log(resp);
      this.productos.push(...resp.productos);
      if (event) {
        event.target.complete();

        if (resp.productos.length === 0) {
          this.habilitado = false;
        }
      }
    });
  }
}
