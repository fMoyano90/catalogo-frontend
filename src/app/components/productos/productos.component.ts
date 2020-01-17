import { Component, OnInit, Input } from "@angular/core";
import { Producto } from "../../interfaces/interfaces";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.scss"]
})
export class ProductosComponent implements OnInit {
  @Input() productos: Producto[] = [];

  constructor() {}

  ngOnInit() {
    console.log(this.productos);
  }
}
