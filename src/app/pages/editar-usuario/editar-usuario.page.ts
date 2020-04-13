import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../interfaces/interfaces";
import { UsuarioService } from "../../services/usuario.service";
import { NgForm } from "@angular/forms";
import { UiServiceService } from "../../services/ui-service.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-editar-usuario",
  templateUrl: "./editar-usuario.page.html",
  styleUrls: ["./editar-usuario.page.scss"]
})
export class EditarUsuarioPage implements OnInit {
  usuario: any = {};
  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {

      let id = params.id;
      
      this.usuario = this.usuarioService.getUsuario(id);
      console.log(this.usuario);
    });
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) {
      return;
    }
    const actualizado = await this.usuarioService.actualizarUsuario(
      this.usuario
    );
    console.log(actualizado);
    if (actualizado) {
      this.uiService.presentToast("Registro actualizado");
    } else {
      this.uiService.presentToast("No se pudo actualizar");
    }
  }

  logout() {}
}
