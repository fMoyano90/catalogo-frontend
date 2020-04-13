import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../interfaces/interfaces";
import { UsuarioService } from "../../services/usuario.service";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.page.html",
  styleUrls: ["./usuarios.page.scss"]
})
export class UsuariosPage implements OnInit {
  usuarios: Usuario[] = [];
  habilitado: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.siguientes();
  }

  recargar(event: any) {
    this.siguientes(event, true);
  }

  siguientes(event?: any, pull: boolean = false) {
    this.usuarioService.getUsuarios(pull).subscribe(resp => {
      console.log(resp);
      this.usuarios.push(...resp.usuarios);
      if (event) {
        event.target.complete();

        if (resp.usuarios.length === 0) {
          this.habilitado = false;
        }
      }
    });
  }

  realizarBusqueda(busqueda) {
    this.router.navigate(["/busqueda-usuario", busqueda]);
  }

  eliminarUsuario(id) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡El usuario no podra recuperarse!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ELIMINAR USUARIO",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(id).subscribe(
          resp => {
            console.log(resp);
            Swal.fire({
              icon: "success",
              title: "Operación completada",
              text: "El usuario fue eliminado exitosamente"
            });
            this.navCtrl.navigateRoot("/usuarios", { animated: true });
          },
          err => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo eliminar el usuario"
            });
          }
        );
      }
    });
  }
}
