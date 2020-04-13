import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/interfaces/interfaces";
import { UsuarioService } from "src/app/services/usuario.service";
import { NgForm } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { UiServiceService } from "src/app/services/ui-service.service";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-actualizar-usuario",
  templateUrl: "./actualizar-usuario.page.html",
  styleUrls: ["./actualizar-usuario.page.scss"]
})
export class ActualizarUsuarioPage implements OnInit {
  registerUser: Usuario = {
    sap: null,
    rut: "",
    nombre: "",
    genero: "",
    estado_civil: "",
    rol: "",
    contrato: "",
    aco: "",
    nacimiento: "",
    ingreso: "",
    division: "",
    centro_costo: "",
    posicion: "",
    div_pers: "",
    funcion: "",
    organizacion: "",
    superintendencia: "",
    gerencia: "",
    regla_ppl: "",
    previsiones: "",
    salud: "",
    calle: "",
    villa: "",
    ciudad: "",
    comuna: "",
    telefono: "",
    region: "",
    sindicato: "",
    tipo_socio: "",
    tipo_usuario: ""
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerUsuario();
  }

  // OBTENER USUARIO POR ID
  obtenerUsuario() {
    this.activatedRoute.params.subscribe(params => {
      let id = params.id;

      this.usuarioService.getUsuario(id).subscribe(resp => {
        this.registerUser = resp["usuario"];
      });
    });
  }

  // ACTUALIZAR USUARIO
  async actualizar(fActualizar: NgForm) {
    console.log("ACTUALIZAR LANZADO");
    if (fActualizar.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Faltan campos en el formulario!"
      });
      return;
    }
    const valido = await this.usuarioService.actualizarUsuario(
      this.registerUser
    );

    if (valido) {
      // Navegar al convenio
      this.navCtrl.navigateRoot("/convenio", { animated: true });
    } else {
      // Mostrar alerta en caso de error
      this.uiService.alertaInformativa("Error al actualzar usuario:");
    }
  }
}
