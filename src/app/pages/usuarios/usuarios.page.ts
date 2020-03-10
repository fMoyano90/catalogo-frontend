import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../interfaces/interfaces";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.page.html",
  styleUrls: ["./usuarios.page.scss"]
})
export class UsuariosPage implements OnInit {
  usuarios: Usuario[] = [];
  habilitado: boolean = true;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.siguientes();
  }

  recargar(event: any) {
    this.siguientes(event, true);
  }

  siguientes(event?: any, pull: boolean = false) {
    this.usuarioService.getUsuarios(pull).subscribe(resp => {
      console.log(resp);
      // this.usuarios.push(...resp.usuarios);
      // if (event) {
      //   event.target.complete();

      //   if (resp.productos.length === 0) {
      //     this.habilitado = false;
      //   }
      // }
    });
  }
}
