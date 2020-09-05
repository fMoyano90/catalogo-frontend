import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductosService } from "../../services/productos.service";
import { Producto } from "../../interfaces/interfaces";
import { Router } from "@angular/router";
import { TouchSequence } from "selenium-webdriver";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit, OnDestroy {
  productos: Producto[] = [];
  habilitado = true;
  busqueda: string;

  constructor(
    private productosService: ProductosService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.siguientes();
    this.productosService.nuevoProducto.subscribe((epp) => {
      this.productos.unshift(epp);
    });
  }

  ngOnDestroy() {
    this.productos = [];
    this.siguientes(null, false);
  }

  recargar(event: any) {
    this.siguientes(event, true);
  }

  siguientes(event?: any, pull: boolean = false) {
    if (pull) {
      this.productos = [];
    }
    this.productosService.getProductos(pull).subscribe((resp) => {
      this.productos.push(...resp.productos);
      if (event) {
        event.target.complete();

        if (resp.productos.length === 0) {
          this.habilitado = false;
        }
      }
    });
  }

  realizarBusqueda(busqueda) {
    this.router.navigate(["/busqueda", busqueda]);
  }
}
