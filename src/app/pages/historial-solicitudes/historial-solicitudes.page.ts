import { Component, OnInit } from "@angular/core";
import { Solicitud } from "../../interfaces/interfaces";
import { SolicitudesService } from "src/app/services/solicitud.service";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { mergeAll, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ajax } from "rxjs/ajax";

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
  ) {
    const URL = environment.url;
  }

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

  // CONVERTIR UN JSON A EXCEL (CSV)
  convertToCSV(objArray) {
    const array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    for (let i = 0; i < array.length; i++) {
      let line = "";
      for (let index in array[i]) {
        if (line != "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return str;
  }

  // EXPORTAR INFORMACIÓN A EXCEL
  exportCSVFile(headers, items, fileName) {
    if (headers) {
      items.unshift(headers);
    }

    const jsonObject = JSON.stringify(items);

    const csv = this.convertToCSV(jsonObject);

    const exportName = fileName + ".csv" || "export.csv";

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, exportName);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  // OBTENER TODAS LAS SOLICITUDES DEL AÑO Y DESCARGAR EN EXCEL
  descargarExcel(anio) {
    // OBTENER SOLICITUDES POR AÑO ESCOGIDO
    this.solicitudService
      .getSolicitudesPorAnioCompleto(anio)
      .pipe(
        map((resp) => resp["solicitudes"]),
        mergeAll()
      )
      .subscribe((resp) => {
        const headers = {
          usuarioID: "ID USUARIO",
          nombre: "NOMBRE",
          rut: "RUT",
          sap: "SAP",
          genero: "GENERO",
          funcion: "FUNCION",
          ubicacion: "UBICACION",
          centro_costo: "CENTRO DE COSTO",
          lugar_retiro: "LUGAR DE RETIRO",
          cargo_actual: "CARGO ACTUAL",
          epps: [
            {
              nombre: "NOMBRE EPP",
              codigo: "CODIGO EPP",
              talla: "TALLA EPP",
            },
            {
              nombre: "NOMBRE EPP",
              codigo: "CODIGO EPP",
              talla: "TALLA EPP",
            },
            {
              nombre: "NOMBRE EPP",
              codigo: "CODIGO EPP",
              talla: "TALLA EPP",
            },
            {
              nombre: "NOMBRE EPP",
              codigo: "CODIGO EPP",
              talla: "TALLA EPP",
            },
          ],
          temporada: "TEMPORADA",
          anio: "AÑO",
          mes: "MES",
          _id: "N° SOLICITUD",
        };

        // ACÁ COLOCAR ARREGLO DE SOLICITUDES POR AÑO
        const data = resp;
        console.log(data);

        this.exportCSVFile(headers, data, "solicitudes-" + this.anio);
      });
  }
}
