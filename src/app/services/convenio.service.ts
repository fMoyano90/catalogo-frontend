import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EppConvenio, RespuestaEppsConvenio } from "../interfaces/interfaces";
import { UsuarioService } from "./usuario.service";
import { environment } from "../../environments/environment.prod";

const URL = environment.url;

@Injectable({
  providedIn: "root",
})
export class ConvenioService {
  paginaEppsConvenio = 0;
  nuevoProducto = new EventEmitter<EppConvenio>();
  updateProducto = new EventEmitter<EppConvenio>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  getEppsConvenio(pull: boolean = false) {
    if (pull) {
      this.paginaEppsConvenio = 0;
    }

    this.paginaEppsConvenio++;

    return this.http.get<RespuestaEppsConvenio>(
      `${URL}/convenio/listado/convenio/?pagina=${this.paginaEppsConvenio}`
    );
  }

  getEppConvenio(id: string) {
    return this.http.get<EppConvenio>(`${URL}/convenio/obtener/epp/${id}`);
  }

  crearEppConvenio(epp) {
    const headers = new HttpHeaders({
      "x-token": this.usuarioService.token,
    });
    this.http.post(`${URL}/convenio`, epp, { headers }).subscribe((resp) => {
      this.nuevoProducto.emit(resp["eppConvenio"]);
    });
  }

  async actualizarEppConvenio(epp, id) {
    const headers = new HttpHeaders({
      "x-token": this.usuarioService.token,
    });

    this.http.put(`${URL}/convenio/editar/${id}`, epp, { headers }).subscribe(
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
  }

  eliminarEppConvenio(id: string) {
    return this.http.delete(`${URL}/convenio/delete/${id}`);
  }

  getBusqueda(busqueda: string, pull: boolean = false) {
    if (pull) {
      this.paginaEppsConvenio = 0;
    }
    this.paginaEppsConvenio++;
    return this.http.get<RespuestaEppsConvenio>(
      `${URL}/buscador/convenio-epp/${busqueda}`
    );
  }
}
