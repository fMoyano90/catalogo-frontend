import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { RespuestaProductos, Producto } from "../interfaces/interfaces";
import { UsuarioService } from "./usuario.service";
import { resolve } from "url";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";

const URL = environment.url;

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  paginaProductos = 0;

  nuevoProducto = new EventEmitter<Producto>();
  updateProducto = new EventEmitter<Producto>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer
  ) {}

  getProductos(pull: boolean = false) {
    if (pull) {
      this.paginaProductos = 0;
    }

    this.paginaProductos++;
    return this.http.get<RespuestaProductos>(
      `${URL}/productos/?pagina=${this.paginaProductos}`
    );
  }

  getProducto(id: string) {
    return this.http.get(`${URL}/productos/${id}`);
  }

  getProductosPorCategoria(categoria: string, pull: boolean = false) {
    if (pull) {
      this.paginaProductos = 0;
    }
    this.paginaProductos++;
    return this.http.get(`${URL}/procutos/${categoria}`);
  }

  getProductosPorGenero(genero: string, pull: boolean = false) {
    // dama || varon
    if (pull) {
      this.paginaProductos = 0;
    }
    this.paginaProductos++;
    return this.http.get(`${URL}/procutos/${genero}`);
  }

  crearProducto(epp) {
    const headers = new HttpHeaders({
      "x-token": this.usuarioService.token
    });
    this.http.post(`${URL}/productos`, epp, { headers }).subscribe(resp => {
      this.nuevoProducto.emit(resp["producto"]);
      resolve(true);
    });
  }

  actualizarProducto(epp, id) {
    const headers = new HttpHeaders({
      "x-token": this.usuarioService.token
    });
    this.http
      .put(`${URL}/productos/${id}`, epp, { headers })
      .subscribe(resp => {
        this.updateProducto.emit(resp["producto"]);
        resolve(true);
      });
  }

  subirImagen(img: string) {
    const options: FileUploadOptions = {
      fileKey: "image",
      headers: {
        "x-token": this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer
      .upload(img, `${URL}/productos/upload`, options)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log("Error en subir imagen", err);
      });
  }
}
