import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { EppConvenio } from "../../interfaces/interfaces";
import { ConvenioService } from "src/app/services/convenio.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-epps-convenio",
  templateUrl: "./epps-convenio.page.html",
  styleUrls: ["./epps-convenio.page.scss"],
})
export class EppsConvenioPage implements OnInit {
  eppsConvenio: EppConvenio[] = [];
  habilitado: boolean = true;

  constructor(
    private convenioService: ConvenioService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.siguientes();
  }

  recargar(event: any) {
    this.siguientes(event, true);
  }

  siguientes(event?: any, pull: boolean = false) {
    this.convenioService.getEppsConvenio(pull).subscribe((resp) => {
      console.log(resp);
      this.eppsConvenio.push(...resp.epps);
      if (event) {
        event.target.complete();

        if (resp.epps.length === 0) {
          this.habilitado = false;
        }
      }
    });
  }

  realizarBusqueda(busqueda) {
    this.router.navigate(["/busqueda-epp-convenio", busqueda]);
  }

  eliminarEppConvenio(id) {
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
        this.convenioService.eliminarEppConvenio(id).subscribe(
          (resp) => {
            console.log(resp);
            Swal.fire({
              icon: "success",
              title: "Operación completada",
              text: "El EPP fue eliminado exitosamente",
            });
            this.navCtrl.navigateRoot("/convenio", { animated: true });
          },
          (err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo eliminar el EPP",
            });
          }
        );
      }
    });
  }
}
