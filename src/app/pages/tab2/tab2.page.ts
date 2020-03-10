import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../../services/productos.service";
import { Producto } from "../../interfaces/interfaces";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page implements OnInit {
  productos: Producto[] = [];
  habilitado = true;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.siguientes();
    this.productosService.nuevoProducto.subscribe(epp => {
      this.productos.unshift(epp);
    });
  }

  recargar(event: any) {
    this.siguientes(event, true);
  }

  siguientes(pull: boolean = false, event?: any) {
    this.productosService
      .getProductosPorGenero("varon", pull)
      .subscribe(resp => {
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
