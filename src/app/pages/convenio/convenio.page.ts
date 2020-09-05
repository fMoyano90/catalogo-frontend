import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { UsuarioService } from "../../services/usuario.service";
import { ProductosService } from "../../services/productos.service";
import { Solicitud } from "src/app/interfaces/interfaces";
import { SolicitudesService } from "../../services/solicitud.service";

@Component({
  selector: "app-convenio",
  templateUrl: "./convenio.page.html",
  styleUrls: ["./convenio.page.scss"],
})
export class ConvenioPage implements OnInit {
  public userRole: string = "USER_ROLE";
  public mes: number;
  public invierno: boolean;
  public verano: boolean;
  public anio: number;
  public solicitudInvierno: Solicitud;
  public solicitudVerano: Solicitud;

  constructor(
    private storage: Storage,
    private usuarioService: UsuarioService,
    private productosService: ProductosService,
    private solicitudesService: SolicitudesService
  ) {
    this.verano = true;
    this.invierno = true;
  }

  ngOnInit() {
    this.obtenerDatos();
    this.usuarioService.validaToken();
    this.usuarioService.obtenerRole().then((resp) => {
      this.userRole = resp;
    });
  }

  obtenerRole() {
    this.storage
      .get("userRole")
      .then((resp) => {
        this.userRole = resp;
      })
      .catch((err) => {
        this.userRole = "USER_ROLE";
      });
  }

  logout() {
    this.productosService.paginaProductos = 0;
    this.usuarioService.logout();
    this.obtenerRole();
  }

  obtenerDatos() {
    const date = new Date();
    this.mes = date.getMonth();
    this.anio = date.getFullYear();

    this.storage
      .get("userID")
      .then((resp) => {
        let userID = resp;
        this.solicitudesService
          .getUltimaSolicitudUsuario(userID, "Invierno")
          .subscribe((resp) => {
            this.solicitudInvierno = resp["solicitud"];
            if (
              (this.solicitudInvierno === null ||
                this.anio !== this.solicitudInvierno.anio) &&
              (this.mes === 0 || this.mes === 1 || this.mes === 2)
            ) {
              this.invierno = false;
            }
          });
        this.solicitudesService
          .getUltimaSolicitudUsuario(userID, "Verano")
          .subscribe((resp) => {
            this.solicitudVerano = resp["solicitud"];
            if (
              (this.solicitudVerano === null ||
                this.anio !== this.solicitudVerano.anio) &&
              (this.mes === 6 || this.mes === 7 || this.mes === 8)
            ) {
              this.verano = false;
            }
          });
      })
      .catch((err) => {
        // REDIRECCIONAR A LOGIN
      });
  }

  refresh(): void {
    window.location.reload();
  }
}
