import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Solicitud } from "../../interfaces/interfaces";
import { SolicitudesService } from "../../services/solicitud.service";

@Component({
  selector: "app-editar-solicitud",
  templateUrl: "./editar-solicitud.page.html",
  styleUrls: ["./editar-solicitud.page.scss"],
})
export class EditarSolicitudPage implements OnInit {
  public solicitud: Solicitud = {
    usuarioID: "",
    nombre: "",
    rut: "",
    sap: "",
    genero: "",
    funcion: "",
    ubicacion: "",
    centro_costo: "",
    lugar_retiro: "",
    cargo_actual: "",
    epps: [],
    temporada: "",
    mes: null,
    anio: null,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private solicitudesService: SolicitudesService,
    private route: Router
  ) {}

  ngOnInit() {
    this.obtenerSolicitud();
  }

  // OBTENER SOLICITUD POR ID
  obtenerSolicitud() {
    this.activatedRoute.params.subscribe((resp) => {
      const id = resp.id;
      this.solicitudesService.getSolicitud(id).subscribe((resp) => {
        this.solicitud = resp["solicitud"];
        console.log(this.solicitud);
      });
    });
  }

  // EDITAR SOLICITUD
  actualizarSolicitud(fActualizar) {
    this.activatedRoute.params.subscribe((resp) => {
      const id = resp.id;
      this.solicitudesService.actualizarSolicitud(id, this.solicitud);
    });

    console.log(this.solicitud, this.solicitud._id);
    this.solicitud = {
      usuarioID: "",
      nombre: "",
      rut: "",
      sap: "",
      genero: "",
      funcion: "",
      ubicacion: "",
      centro_costo: "",
      lugar_retiro: "",
      cargo_actual: "",
      epps: [],
      temporada: "",
      mes: null,
      anio: null,
    };

    this.route.navigateByUrl("/tabs/tab1");
  }
}
