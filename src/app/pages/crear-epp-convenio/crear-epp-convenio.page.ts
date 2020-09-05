import { Component, OnInit } from "@angular/core";
import { ConvenioService } from "../../services/convenio.service";
import { EppConvenio } from "../../interfaces/interfaces";
import { Router } from "@angular/router";

@Component({
  selector: "app-crear-epp-convenio",
  templateUrl: "./crear-epp-convenio.page.html",
  styleUrls: ["./crear-epp-convenio.page.scss"],
})
export class CrearEppConvenioPage implements OnInit {
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
    private route: Router
  ) {}

  ngOnInit() {}

  crearEpp = async () => {
    console.log(this.eppConvenio);
    const creado = await this.convenioService.crearEppConvenio(
      this.eppConvenio
    );

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
}
