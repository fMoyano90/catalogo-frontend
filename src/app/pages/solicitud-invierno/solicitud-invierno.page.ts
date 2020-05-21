import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario, Solicitud, Convenio } from "../../interfaces/interfaces";
import { UsuarioService } from "../../services/usuario.service";
import { SolicitudesService } from "../../services/solicitud.service";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { filter } from "minimatch";
import { Epp } from "../../interfaces/interfaces";
import { pluck } from "rxjs/operators";
@Component({
  selector: "app-solicitud-invierno",
  templateUrl: "./solicitud-invierno.page.html",
  styleUrls: ["./solicitud-invierno.page.scss"],
})
export class SolicitudInviernoPage implements OnInit {
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
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private route: Router,
    private http: HttpClient
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
    const date = new Date();
    this.solicitud.usuarioID = this.usuario._id;
    this.solicitud.nombre = this.usuario.nombre;
    this.solicitud.rut = this.usuario.rut;
    this.solicitud.sap = this.usuario.sap;
    this.solicitud.genero = this.usuario.genero;
    this.solicitud.funcion = this.usuario.funcion;
    this.solicitud.ubicacion = this.usuario.ubicacion;
    this.solicitud.centro_costo = this.usuario.centro_costo;
    this.solicitud.temporada = this.usuario.temporada;
    this.solicitud.mes = date.getMonth();
    this.solicitud.anio = date.getFullYear();

    // Obtener datos de los epp escogidos
    if (this.zapato.codigo) {
      this.buscarEppPorCodigo(this.zapato.codigo).subscribe((resp) => {
        console.log(resp);
      });
    }
    // Insertar epps en el campo epps de la solicitud
    this.solicitud.epps.push(
      this.zapato,
      this.zapatoElectrico,
      this.buzo,
      this.buzoMecanico,
      this.buzoElectrico,
      this.camisa,
      this.camisaElectrico,
      this.camisaPcElect,
      this.pantalon,
      this.pantalonPc,
      this.parka
    );

    // Enviar solicitud para guardar a servicio y retornar respuestas

    console.log(this.solicitud);
  }

  // OBTENER EPPS CONVENIO
  obtenerEppsConvenio() {
    // ORDEN DE FILTRADO:
    // tipo, lugar, genero, temporada, cargo
    const lugar = this.usuario.ubicacion;
    const cargo = this.usuario.cargo;
    const genero = this.usuario.genero;
    let temporada = "invierno";
    const date = new Date();
    const anio = date.getFullYear();

    // ZAPATOS
    if (lugar == "los_andes") {
      temporada = "verano";
      this.solicitudService
        .getEppsConvenioPorTipo("ZAPATO", lugar, genero, temporada, cargo)
        .subscribe((resp) => {
          this.zapatos = resp["eppsConvenio"];
        });
    } else {
      this.solicitudService
        .getEppsConvenioPorTipo("ZAPATO", lugar, genero, temporada, cargo)
        .subscribe((resp) => {
          this.zapatos = resp["eppsConvenio"];
        });
    }

    temporada = "invierno";

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

  buscarEppPorCodigo(codigo) {
    return this.solicitudService.getEppPorCodigo(codigo);
  }
}
