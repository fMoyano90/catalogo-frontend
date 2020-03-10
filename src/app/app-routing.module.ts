import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { UsuarioGuard } from "./guards/usuario.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then(m => m.TabsPageModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "convenio",
    loadChildren: () =>
      import("./pages/convenio/convenio.module").then(
        m => m.ConvenioPageModule
      ),
    canLoad: [UsuarioGuard]
  },
  {
    path: "usuarios",
    loadChildren: () =>
      import("./pages/usuarios/usuarios.module").then(
        m => m.UsuariosPageModule
      ),
    canLoad: [UsuarioGuard]
  },
  {
    path: "editar-usuario",
    loadChildren: () =>
      import("./pages/editar-usuario/editar-usuario.module").then(
        m => m.EditarUsuarioPageModule
      ),
    canLoad: [UsuarioGuard]
  },
  {
    path: "crear-epp",
    loadChildren: () =>
      import("./pages/crear-epp/crear-epp.module").then(
        m => m.CrearEppPageModule
      ),
    canLoad: [UsuarioGuard]
  },
  {
    path: "actualizar-epp/:id",
    loadChildren: () =>
      import("./pages/actualizar-epp/actualizar-epp.module").then(
        m => m.ActualizarEppPageModule
      )
  },
  {
    path: "categoria/:categoria",
    loadChildren: () =>
      import("./pages/categoria/categoria.module").then(
        m => m.CategoriaPageModule
      )
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
