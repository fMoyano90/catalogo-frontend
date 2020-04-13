import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/interfaces/interfaces";
import { UsuarioService } from "src/app/services/usuario.service";
import { NgForm } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { UiServiceService } from "src/app/services/ui-service.service";

@Component({
  selector: "app-crear-usuario",
  templateUrl: "./crear-usuario.page.html",
  styleUrls: ["./crear-usuario.page.scss"]
})
export class CrearUsuarioPage implements OnInit {
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
    private uiService: UiServiceService
  ) {}

  ngOnInit() {}

  // REGISTRO DE USUARIOS
  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }
    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido) {
      // Navegar al convenio
      this.navCtrl.navigateRoot("/convenio", { animated: true });
    } else {
      // Mostrar alerta de sap o contraseña invalido
      this.uiService.alertaInformativa(
        "El email ya existe en nuestros registros."
      );
    }
  }
}
