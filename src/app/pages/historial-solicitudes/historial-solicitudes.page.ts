import { Component, OnInit } from "@angular/core";
import { Solicitud } from "../../interfaces/interfaces";
import { SolicitudesService } from "src/app/services/solicitud.service";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-historial-solicitudes",
  templateUrl: "./historial-solicitudes.page.html",
  styleUrls: ["./historial-solicitudes.page.scss"],
})
export class HistorialSolicitudesPage implements OnInit {
  public solicitudes: Solicitud[] = [];
  public habilitado: boolean = true;
  public anio: number;
  constructor(
    private solicitudService: SolicitudesService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  atraparAnio(anio: number) {
    this.siguientes(anio);
  }

  recargar(event: any) {
    this.siguientes(event, true);
  }

  siguientes(anio: number, event?: any, pull: boolean = false) {
    this.solicitudService
      .getSolicitudesPorAnio(anio, pull)
      .subscribe((resp) => {
        console.log(resp);
        this.solicitudes.push(...resp.solicitudes);
        if (event) {
          event.target.complete();
          if (resp.solicitudes.length === 0) {
            this.habilitado = false;
          }
        }
      });
  }
}
