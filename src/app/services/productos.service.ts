import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { RespuestaProductos } from "../interfaces/interfaces";

const URL = environment.url;

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  paginaProductos = 0;

  constructor(private http: HttpClient) {}

  getProductos(pull: boolean = false) {
    if (pull) {
      this.paginaProductos = 0;
    }

    this.paginaProductos++;
    return this.http.get<RespuestaProductos>(
      `${URL}/productos/?pagina=${this.paginaProductos}`
    );
  }
}
