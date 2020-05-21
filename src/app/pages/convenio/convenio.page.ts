import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { UsuarioService } from "../../services/usuario.service";
import { ProductosService } from "../../services/productos.service";

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

  constructor(
    private storage: Storage,
    private usuarioService: UsuarioService,
    private productosService: ProductosService
  ) {
    this.verano = true;
    this.invierno = true;
  }

  ngOnInit() {
    this.temporada();
    this.usuarioService.validaToken();
    this.usuarioService.obtenerRole().then((resp) => {
      this.userRole = resp;
    });
  }

  temporada() {
    this.obtenerMes();
    if (this.mes === 0 || this.mes === 1 || this.mes === 2) {
      this.invierno = false;
    } else if (
      this.mes === 5 ||
      this.mes === 6 ||
      this.mes === 7 ||
      this.mes === 4
    ) {
      this.verano = false;
    }
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

  obtenerMes() {
    const date = new Date();
    this.mes = date.getMonth();
  }

  refresh(): void {
    window.location.reload();
  }
}
