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

  public epp: Epp = {
    nombre: "",
    talla: "",
    codigo: "",
  };

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

  enviarSolicitud() {}

  obtenerEppsConvenio() {
    // ORDEN DE FILTRADO:
    // tipo, lugar, genero, temporada, cargo
    const lugar = this.usuario.ubicacion;
    const cargo = this.usuario.cargo;
    const genero = this.usuario.genero;
    const temporada = "verano";
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
