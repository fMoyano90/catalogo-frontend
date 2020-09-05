import { Component, OnInit } from "@angular/core";
import { ConvenioService } from "../../services/convenio.service";
import { EppConvenio } from "../../interfaces/interfaces";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-editar-epp-convenio",
  templateUrl: "./editar-epp-convenio.page.html",
  styleUrls: ["./editar-epp-convenio.page.scss"],
})
export class EditarEppConvenioPage implements OnInit {
  eppConvenio: EppConvenio = {
    codigo: "",
    epp: "",
    salacom: "",
    los_andes: "",
    huechun: "",
    saladillo: "",
    planta_filtro: "",
    hombre: "",
    mujer: "",
    verano: "",
    invierno: "",
    mecanico: "",
    electrico: "",
    general: "",
    anioxmedio: "",
    tipo: "",
    talla: "",
  };

  constructor(
    private convenioService: ConvenioService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerEpp();
  }

  editarEpp = async (id) => {
    const actualizado = await this.convenioService.actualizarEppConvenio(
      this.eppConvenio,
      id
    );

    console.log(this.eppConvenio, id);

    this.eppConvenio = {
      codigo: "",
      epp: "",
      salacom: "",
      los_andes: "",
      huechun: "",
      saladillo: "",
      planta_filtro: "",
      hombre: "",
      mujer: "",
      verano: "",
      invierno: "",
      mecanico: "",
      electrico: "",
      general: "",
      anioxmedio: "",
      tipo: "",
      talla: "",
    };

    this.route.navigateByUrl("/epps-convenio");
  };

  obtenerEpp = () => {
    this.activatedRoute.params.subscribe((params) => {
      let id = params.id;
      this.convenioService.getEppConvenio(id).subscribe(
        (resp) => {
          this.eppConvenio = resp["convenioEpp"];
        },
        (error) => console.log(error)
      );
    });
  };
}
