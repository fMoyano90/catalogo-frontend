import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../../services/productos.service";
import { Producto } from "../../interfaces/interfaces";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-categoria",
  templateUrl: "./categoria.page.html",
  styleUrls: ["./categoria.page.scss"]
})
export class CategoriaPage implements OnInit {
  productos: Producto[] = [];
  habilitado = true;
  categoria: string;

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
      this.categoria = params.categoria;

      this.productosService
        .getProductosPorCategoria(this.categoria, pull)
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
    });
  }
}
