import { Component, OnInit, Input } from "@angular/core";
import { Producto } from "../../interfaces/interfaces";
import Swal from "sweetalert2";
import { ProductosService } from "../../services/productos.service";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html",
  styleUrls: ["./producto.component.scss"],
})
export class ProductoComponent implements OnInit {
  @Input() producto: Producto = {};

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
  };

  public userRole: string;

  constructor(
    private productoService: ProductosService,
    private navCtrl: NavController,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.obtenerRole();
  }

  eliminarEpp(id) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El EPP no podra recuperarse!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ELIMINAR EPP",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.productoService.eliminarEpp(id).subscribe(
          (resp) => {
            console.log(resp);
            Swal.fire({
              icon: "success",
              title: "Operación completada",
              text: "El EPP fue eliminado exitosamente",
            });
            this.navCtrl.navigateRoot("/tabs/tab1", { animated: true });
          },
          (err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo eliminar el EPP, intenta mas tarde",
            });
          }
        );
      }
    });
  }

  async obtenerRole() {
    await this.storage.get("userRole").then((resp) => {
      this.userRole = resp;
      console.log(resp);
    });
  }
}
