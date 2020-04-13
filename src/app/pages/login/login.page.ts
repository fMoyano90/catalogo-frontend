import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUser = {
    rut: '',
    sap: '',
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) {}

  ngOnInit() {}

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    const valido = await this.usuarioService.login(
      this.loginUser.rut,
      this.loginUser.sap
    );

    if (valido) {
      // Navegar al convenio
      this.navCtrl.navigateRoot('/convenio', { animated: true });
    } else {
      // Mostrar alerta de sap o contraseña invalido
      this.uiService.alertaInformativa(
        'RUT y/o SAP no se encuentra en base de datos. <br> Contacta a tu jefe directo.'
      );
    }
  }
}
