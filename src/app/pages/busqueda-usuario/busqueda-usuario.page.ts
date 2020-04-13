import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UsuarioService } from "../../services/usuario.service";
import { Usuario } from "../../interfaces/interfaces";
import Swal from "sweetalert2";

@Component({
  selector: "app-busqueda-usuario",
  templateUrl: "./busqueda-usuario.page.html",
  styleUrls: ["./busqueda-usuario.page.scss"]
})
export class BusquedaUsuarioPage implements OnInit {
  usuarios: Usuario[] = [];
  habilitado = true;
  busqueda: string;
  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.siguientes();
  }

  recargar(event: any) {
    this.siguientes(event, true);
  }

  siguientes(pull: boolean = false, event?: any) {
    this.activatedRoute.params.subscribe(params => {
      this.busqueda = params.busqueda;

      this.usuarioService.getBusqueda(this.busqueda, pull).subscribe(resp => {
        console.log(resp);
        this.usuarios.push(...resp.usuarios);
        if (event) {
          event.target.complete();

          if (resp.usuarios.length === 0) {
            this.habilitado = false;
          }
        }
      });
    });
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
