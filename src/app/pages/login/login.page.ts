import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IonSlides, NavController } from "@ionic/angular";
import { UsuarioService } from "../../services/usuario.service";
import { UiServiceService } from "../../services/ui-service.service";
import { Usuario } from "src/app/interfaces/interfaces";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  @ViewChild("slider", { static: true }) slides: IonSlides;

  avatars = [
    {
      img: "av-1.png",
      seleccionado: true
    },
    {
      img: "av-2.png",
      seleccionado: false
    },
    {
      img: "av-3.png",
      seleccionado: false
    },
    {
      img: "av-4.png",
      seleccionado: false
    },
    {
      img: "av-5.png",
      seleccionado: false
    },
    {
      img: "av-6.png",
      seleccionado: false
    },
    {
      img: "av-7.png",
      seleccionado: false
    },
    {
      img: "av-8.png",
      seleccionado: false
    }
  ];

  loginUser = {
    email: "test@test.com",
    password: "123456"
  };

  registerUser: Usuario = {
    email: "test@test.com",
    password: "123456",
    nombre: "test",
    sap: "12345",
    rut: "174695563"
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) {}

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    const valido = await this.usuarioService.login(
      this.loginUser.email,
      this.loginUser.password
    );

    if (valido) {
      // Navegar al convenio
      this.navCtrl.navigateRoot("/convenio", { animated: true });
    } else {
      // Mostrar alerta de sap o contraseña invalido
      this.uiService.alertaInformativa("Usuario y/o contraseña invalido.");
    }
  }
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

  seleccionarAvatar(avatar) {
    this.avatars.forEach(av => (av.seleccionado = false));

    avatar.seleccionado = true;
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
}
