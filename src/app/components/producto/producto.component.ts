import { Component, OnInit, Input } from "@angular/core";
import { Producto } from "../../interfaces/interfaces";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.scss"]
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto = {};

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  public img1 = "/assets/guante.jpg";

  constructor() {}

  ngOnInit() {}
}
