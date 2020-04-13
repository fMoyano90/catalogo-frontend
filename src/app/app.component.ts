import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { UsuarioService } from "./services/usuario.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public userRole: string = "USER_ROLE";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private usuarioService: UsuarioService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.usuarioService.obtenerRole().then((resp) => {
      this.userRole = resp;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  obtenerRole() {
    this.storage
      .get("userRole")
      .then((resp) => {
        this.userRole = resp;
      })
      .catch((err) => {
        this.userRole = "USER_ROLE";
      });
  }

  logout() {
    this.usuarioService.logout();
    this.obtenerRole();
  }
}
