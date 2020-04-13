import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../../services/productos.service";
import { Producto } from "../../interfaces/interfaces";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.page.html",
  styleUrls: ["./busqueda.page.scss"]
})
export class BusquedaPage implements OnInit {
  productos: Producto[] = [];
  habilitado = true;
  busqueda: string;

  constructor(
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute
  ) {}

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
    this.activatedRoute.params.subscribe(params => {
      this.busqueda = params.busqueda;

      this.productosService.getBusqueda(this.busqueda, pull).subscribe(resp => {
        console.log(resp);
        this.productos.push(...resp.productos);
        if (event) {
          event.target.complete();

          if (resp.productos.length === 0) {
            this.habilitado = false;
          }
        }
      });
    });
  }
}
