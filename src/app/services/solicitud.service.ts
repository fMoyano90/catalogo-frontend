import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import {
  RespuestaSolicitudes,
  Solicitud,
  Convenio,
} from "../interfaces/interfaces";
import { UsuarioService } from "./usuario.service";
import { Storage } from "@ionic/storage";
import Swal from "sweetalert2";

const URL = environment.url;

@Injectable({
  providedIn: "root",
})
export class SolicitudesService {
  paginaSolicitudes = 0;
  nuevaSolicitud = new EventEmitter<Solicitud>();
  updateSolicitud = new EventEmitter<Solicitud>();
  token: string;

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private storage: Storage
  ) {
    this.obtenerToken();
  }

  obtenerToken() {
    this.storage.get("token").then((resp) => {
      this.token = resp;
    });
  }
  // CREAR SOLICITUD
  enviarSolicitud(solicitud) {
    const headers = new HttpHeaders({
      "x-token": this.token,
    });
    this.http.post(`${URL}/solicitudes`, solicitud, { headers }).subscribe(
      (resp) => {
        this.nuevaSolicitud.emit(resp["solicitud"]);
        Swal.fire({
          icon: "success",
          title: "Solicitud enviada",
          text: "Se ha enviado exitosamente la solicitud",
        });
      },
      (err) => {
        Swal.fire({
          icon: "error",
          title: "Ocurrio un error",
          text: "Vuelve a intentarlo más tarde",
        });
        throw err;
      }
    );
  }

  // LLAMAR HISTORIAL DE SOLICITUDES POR AÑO
  getSolicitudesPorAnio(anio: number, pull: boolean = false) {
    if (pull) {
      this.paginaSolicitudes = 0;
    }
    this.paginaSolicitudes++;
    return this.http.get<RespuestaSolicitudes>(`${URL}/solicitudes/${anio}`);
  }

  // LLAMAR SOLICITUD POR ID
  getSolicitud(id: string) {
    return this.http.get<Solicitud>(`${URL}/solicitudes/obtener/${id}`);
  }
  // tipo, lugar, genero, temporada, cargo
  getEppsConvenioPorTipo(
    tipo: string,
    lugar: string,
    genero: string,
    temporada: string,
    cargo: string
  ) {
    return this.http.get<Convenio>(
      `${URL}/convenio/${tipo}/${lugar}/${genero}/${temporada}/${cargo}`
    );
  }

  getEppPorCodigo(codigo: string) {
    return this.http.get<Convenio>(`${URL}/convenio/${codigo}`);
  }
}
