import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../../services/productos.service";
import { Producto } from "../../interfaces/interfaces";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements OnInit {
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
      .getProductosPorGenero("dama", pull)
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
