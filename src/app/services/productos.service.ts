import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { RespuestaProductos, Producto } from "../interfaces/interfaces";
import { UsuarioService } from "./usuario.service";
import { resolve } from "url";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { Storage } from "@ionic/storage";

const URL = environment.url;

@Injectable({
  providedIn: "root",
})
export class ProductosService {
  paginaProductos = 0;
  nuevoProducto = new EventEmitter<Producto>();
  updateProducto = new EventEmitter<Producto>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer,
    private storage: Storage
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
    return this.http.get<Producto>(`${URL}/productos/${id}`);
  }

  getBusqueda(busqueda: string, pull: boolean = false) {
    if (pull) {
      this.paginaProductos = 0;
    }
    this.paginaProductos++;
    return this.http.get<RespuestaProductos>(`${URL}/buscador/${busqueda}`);
  }

  getProductosPorCategoria(categoria: string, pull: boolean = false) {
    if (pull) {
      this.paginaProductos = 0;
    }
    this.paginaProductos++;
    return this.http.get<RespuestaProductos>(
      `${URL}/productos/categoria/${categoria}`
    );
  }

  getProductosPorGenero(genero: string, pull: boolean = false) {
    // dama || varon
    if (pull) {
      this.paginaProductos = 0;
    }
    this.paginaProductos++;
    return this.http.get<RespuestaProductos>(
      `${URL}/productos/genero/${genero}`
    );
  }

  crearProducto(epp) {
    const headers = new HttpHeaders({
      "x-token": this.usuarioService.token,
    });
    this.http.post(`${URL}/productos`, epp, { headers }).subscribe((resp) => {
      this.nuevoProducto.emit(resp["producto"]);
    });
  }

  async actualizarProducto(epp, id) {
    this.storage.get("token").then((resp) => {
      let token: string;
      token = resp;

      const headers = new HttpHeaders({
        "x-token": token,
      });

      console.log(URL);

      this.http.put(`${URL}/productos/${id}`, epp, { headers }).subscribe(
        (resp) => {
          this.updateProducto.emit(resp["producto"]);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("Operación completada con exito");
        }
      );
    });
  }

  subirImagen(img: string) {
    const options: FileUploadOptions = {
      fileKey: "image",
      headers: {
        "x-token": this.usuarioService.token,
      },
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer
      .upload(img, `${URL}/productos/upload`, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error en subir imagen", err);
      });
  }

  eliminarEpp(id: string) {
    return this.http.delete(`${URL}/productos/delete-epp/${id}`);
  }
}
