import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SolicitudesService } from "../../services/solicitud.service";
import { Solicitud } from "src/app/interfaces/interfaces";

@Component({
  selector: "app-solicitud",
  templateUrl: "./solicitud.page.html",
  styleUrls: ["./solicitud.page.scss"],
})
export class SolicitudPage implements OnInit {
  public solicitud: Solicitud;

  constructor(
    private activatedRoute: ActivatedRoute,
    private solicitudService: SolicitudesService
  ) {}

  ngOnInit() {
    this.obtenerSolicitud();
  }

  // Obtener solicitud por id
  obtenerSolicitud() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params.id;

      this.solicitudService.getSolicitud(id).subscribe((resp) => {
        this.solicitud = resp["solicitud"];
      });
    });
  }
}
