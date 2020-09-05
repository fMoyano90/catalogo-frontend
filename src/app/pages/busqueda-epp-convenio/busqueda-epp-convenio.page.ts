import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConvenioService } from "../../services/convenio.service";
import { EppConvenio } from "../../interfaces/interfaces";
import Swal from "sweetalert2";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-busqueda-epp-convenio",
  templateUrl: "./busqueda-epp-convenio.page.html",
  styleUrls: ["./busqueda-epp-convenio.page.scss"],
})
export class BusquedaEppConvenioPage implements OnInit {
  eppsConvenio: EppConvenio[] = [];
  habilitado = true;
  busqueda: string;

  constructor(
    private convenioService: ConvenioService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.siguientes();
  }

  recargar(event: any) {
    this.siguientes(event, true);
  }

  siguientes(pull: boolean = false, event?: any) {
    this.activatedRoute.params.subscribe((params) => {
      this.busqueda = params.busqueda;
      console.log(params.busqueda);

      this.convenioService.getBusqueda(this.busqueda, pull).subscribe(
        (resp) => {
          console.log(resp);
          this.eppsConvenio.push(...resp.epps);
          if (event) {
            event.target.complete();

            if (resp.epps.length === 0) {
              this.habilitado = false;
            }
          }
        },
        (err) => {
          console.log(err as any);
        }
      );
    });
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
