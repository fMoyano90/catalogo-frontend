import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Solicitud, Convenio } from "../../interfaces/interfaces";
import { UsuarioService } from "../../services/usuario.service";
import { SolicitudesService } from "../../services/solicitud.service";
import { Storage } from "@ionic/storage";

import { Epp } from "../../interfaces/interfaces";
@Component({
  selector: "app-solicitud-verano",
  templateUrl: "./solicitud-verano.page.html",
  styleUrls: ["./solicitud-verano.page.scss"],
})
export class SolicitudVeranoPage implements OnInit {
  public usuario: any = {};
  public solicitud: Solicitud = {
    usuarioID: "",
    nombre: "",
    rut: "",
    sap: "",
    genero: "",
    funcion: "",
    ubicacion: "",
    centro_costo: "",
    lugar_retiro: "",
    cargo_actual: "",
    epps: [],
    temporada: "",
    mes: null,
    anio: null,
  };

  // EPPS A GUARDAR
  public zapato: Epp = { codigo: null, nombre: "", talla: "" };
  public zapatoElectrico: Epp = { codigo: null, nombre: "", talla: "" };
  public buzo: Epp = { codigo: null, nombre: "", talla: "" };
  public buzoMecanico: Epp = { codigo: null, nombre: "", talla: "" };
  public buzoElectrico: Epp = { codigo: null, nombre: "", talla: "" };
  public camisa: Epp = { codigo: null, nombre: "", talla: "" };
  public camisaElectrico: Epp = { codigo: null, nombre: "", talla: "" };
  public camisaPcElect: Epp = { codigo: null, nombre: "", talla: "" };
  public pantalon: Epp = { codigo: null, nombre: "", talla: "" };
  public pantalonPc: Epp = { codigo: null, nombre: "", talla: "" };
  public parka: Epp = { codigo: null, nombre: "", talla: "" };

  // CAMPOS FORMULARIO
  public zapatos: Convenio[];
  public zapatosElectricos: Convenio[];
  public buzos: Convenio[];
  public buzosMecanicos: Convenio[];
  public buzosElectricos: Convenio[];
  public camisas: Convenio[];
  public camisasElectricos: Convenio[];
  public camisasPcElect: Convenio[];
  public pantalonesPc: Convenio[];
  public pantalones: Convenio[];
  public parkas: Convenio[];

  public userID: string;

  constructor(
    private usuarioService: UsuarioService,
    private solicitudService: SolicitudesService,

    private storage: Storage,
    private route: Router
  ) {
    this.obtenerID().then((resp) => {
      this.userID = resp;
    });
  }

  ngOnInit() {
    this.obtenerUsuario();
  }

  async obtenerID() {
    return await this.storage.get("userID");
  }

  // Obtener usuario por ID
  async obtenerUsuario() {
    const id = await this.obtenerID();

    this.usuarioService.getUsuario(id).subscribe((params) => {
      this.usuario = params["usuario"];
      this.obtenerEppsConvenio();
    });
  }

  // ENVIAR SOLICITUD CONVENIO
  enviarSolicitud(form) {
    // PREPARAR DATOS DE SOLICITUD
    const date = new Date();
    this.solicitud.usuarioID = this.usuario._id;
    this.solicitud.nombre = this.usuario.nombre;
    this.solicitud.rut = this.usuario.rut;
    this.solicitud.sap = this.usuario.sap;
    this.solicitud.genero = this.usuario.genero;
    this.solicitud.funcion = this.usuario.cargo;
    this.solicitud.ubicacion = this.usuario.ubicacion;
    this.solicitud.centro_costo = this.usuario.centro_costo;
    this.solicitud.temporada = "Verano";
    this.solicitud.mes = date.getMonth();
    this.solicitud.anio = date.getFullYear();

    if (this.zapato.nombre != "") {
      let epp = this.zapato.nombre.split(",");
      this.zapato.codigo = parseInt(epp[0]);
      this.zapato.talla = epp[1];
      this.zapato.nombre = epp[2];
      this.solicitud.epps.push(this.zapato);
    }
    if (this.zapatoElectrico.nombre != "") {
      let epp = this.zapatoElectrico.nombre.split(",");
      this.zapatoElectrico.codigo = parseInt(epp[0]);
      this.zapatoElectrico.talla = epp[1];
      this.zapatoElectrico.nombre = epp[2];
      this.solicitud.epps.push(this.zapatoElectrico);
    }
    if (this.buzo.nombre != "") {
      let epp = this.buzo.nombre.split(",");
      this.buzo.codigo = parseInt(epp[0]);
      this.buzo.talla = epp[1];
      this.buzo.nombre = epp[2];
      this.solicitud.epps.push(this.buzo);
    }
    if (this.buzoMecanico.nombre != "") {
      let epp = this.buzoMecanico.nombre.split(",");
      this.buzoMecanico.codigo = parseInt(epp[0]);
      this.buzoMecanico.talla = epp[1];
      this.buzoMecanico.nombre = epp[2];
      this.solicitud.epps.push(this.buzoMecanico);
    }
    if (this.buzoElectrico.nombre != "") {
      let epp = this.buzoElectrico.nombre.split(",");
      this.buzoElectrico.codigo = parseInt(epp[0]);
      this.buzoElectrico.talla = epp[1];
      this.buzoElectrico.nombre = epp[2];
      this.solicitud.epps.push(this.buzoElectrico);
    }
    if (this.camisa.nombre != "") {
      let epp = this.camisa.nombre.split(",");
      this.camisa.codigo = parseInt(epp[0]);
      this.camisa.talla = epp[1];
      this.camisa.nombre = epp[2];
      this.solicitud.epps.push(this.camisa);
    }
    if (this.camisaElectrico.nombre != "") {
      let epp = this.camisaElectrico.nombre.split(",");
      this.camisaElectrico.codigo = parseInt(epp[0]);
      this.camisaElectrico.talla = epp[1];
      this.camisaElectrico.nombre = epp[2];
      this.solicitud.epps.push(this.camisaElectrico);
    }
    if (this.camisaPcElect.nombre != "") {
      let epp = this.camisaPcElect.nombre.split(",");
      this.camisaPcElect.codigo = parseInt(epp[0]);
      this.camisaPcElect.talla = epp[1];
      this.camisaPcElect.nombre = epp[2];
      this.solicitud.epps.push(this.camisaPcElect);
    }
    if (this.pantalonPc.nombre != "") {
      let epp = this.pantalonPc.nombre.split(",");
      this.pantalonPc.codigo = parseInt(epp[0]);
      this.pantalonPc.talla = epp[1];
      this.pantalonPc.nombre = epp[2];
      this.solicitud.epps.push(this.pantalonPc);
    }
    if (this.pantalon.nombre != "") {
      let epp = this.pantalon.nombre.split(",");
      this.pantalon.codigo = parseInt(epp[0]);
      this.pantalon.talla = epp[1];
      this.pantalon.nombre = epp[2];
      this.solicitud.epps.push(this.pantalon);
    }
    if (this.parka.nombre != "") {
      let epp = this.parka.nombre.split(",");
      this.parka.codigo = parseInt(epp[0]);
      this.parka.talla = epp[1];
      this.parka.nombre = epp[2];
      this.solicitud.epps.push(this.parka);
    }
    // Enviar solicitud para guardar a servicio y retornar respuestas
    this.solicitudService.enviarSolicitud(this.solicitud);
    this.route.navigateByUrl("/tabs/tab1");
  }

  obtenerEppsConvenio() {
    // ORDEN DE FILTRADO:
    // tipo, lugar, genero, temporada, cargo
    const lugar = this.usuario.ubicacion;
    const cargo = this.usuario.cargo;
    const genero = this.usuario.genero;
    let temporada = "verano";
    const date = new Date();
    const anio = date.getFullYear();

    // ZAPATOS
    this.solicitudService
      .getEppsConvenioPorTipo("ZAPATO", lugar, genero, temporada, cargo)
      .subscribe((resp) => {
        this.zapatos = resp["eppsConvenio"];
      });

    // ZAPATOSELECTRICOS
    this.solicitudService
      .getEppsConvenioPorTipo(
        "ZAPATO_ELECTRICO",
        lugar,
        genero,
        temporada,
        cargo
      )
      .subscribe((resp) => {
        this.zapatosElectricos = resp["eppsConvenio"];
      });

    // BUZOS
    this.solicitudService
      .getEppsConvenioPorTipo("BUZO", lugar, genero, temporada, cargo)
      .subscribe((resp) => {
        this.buzos = resp["eppsConvenio"];
      });

    // BUZOS MECANICOS
    this.solicitudService
      .getEppsConvenioPorTipo("BUZO_MECANICO", lugar, genero, temporada, cargo)
      .subscribe((resp) => {
        this.buzosMecanicos = resp["eppsConvenio"];
      });

    // BUZOS ELECTRICOS
    this.solicitudService
      .getEppsConvenioPorTipo("BUZO_ELECTRICO", lugar, genero, temporada, cargo)
      .subscribe((resp) => {
        this.buzosMecanicos = resp["eppsConvenio"];
      });

    // CAMISAS
    this.solicitudService
      .getEppsConvenioPorTipo("CAMISA", lugar, genero, temporada, cargo)
      .subscribe((resp) => {
        this.camisas = resp["eppsConvenio"];
      });

    // CAMISASELECTRICOS
    this.solicitudService
      .getEppsConvenioPorTipo(
        "CAMISA_ELECTRICO",
        lugar,
        genero,
        temporada,
        cargo
      )
      .subscribe((resp) => {
        this.camisasElectricos = resp["eppsConvenio"];
      });

    // PANTALONES
    this.solicitudService
      .getEppsConvenioPorTipo("PANTALON", lugar, genero, temporada, cargo)
      .subscribe((resp) => {
        this.pantalones = resp["eppsConvenio"];
      });

    // PANTALONES PRIMERA CAPA
    this.solicitudService
      .getEppsConvenioPorTipo("PANTALON_PC", lugar, genero, temporada, cargo)
      .subscribe((resp) => {
        this.pantalonesPc = resp["eppsConvenio"];
      });

    // CAMISAS PRIMERA CAPA ELECTRICOS
    this.solicitudService
      .getEppsConvenioPorTipo(
        "CAMISA_PC_ELECT",
        lugar,
        genero,
        temporada,
        cargo
      )
      .subscribe((resp) => {
        this.camisasPcElect = resp["eppsConvenio"];
      });

    // PARKAS (CONDICION AÑO POR MEDIO)
    if (anio % 2 === 1) {
      this.solicitudService
        .getEppsConvenioPorTipo("PARKA", lugar, genero, temporada, cargo)
        .subscribe((resp) => {
          this.parkas = resp["eppsConvenio"];
        });
    } else {
      this.parkas = null;
    }
  }
}
