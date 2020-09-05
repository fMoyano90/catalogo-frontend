import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { UsuarioGuard } from "./guards/usuario.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "convenio",
    loadChildren: () =>
      import("./pages/convenio/convenio.module").then(
        (m) => m.ConvenioPageModule
      ),
    canLoad: [UsuarioGuard],
  },
  {
    path: "usuarios",
    loadChildren: () =>
      import("./pages/usuarios/usuarios.module").then(
        (m) => m.UsuariosPageModule
      ),
    canLoad: [UsuarioGuard],
  },
  {
    path: "editar-usuario",
    loadChildren: () =>
      import("./pages/editar-usuario/editar-usuario.module").then(
        (m) => m.EditarUsuarioPageModule
      ),
    canLoad: [UsuarioGuard],
  },
  {
    path: "crear-epp",
    loadChildren: () =>
      import("./pages/crear-epp/crear-epp.module").then(
        (m) => m.CrearEppPageModule
      ),
    canLoad: [UsuarioGuard],
  },
  {
    path: "actualizar-epp/:id",
    loadChildren: () =>
      import("./pages/actualizar-epp/actualizar-epp.module").then(
        (m) => m.ActualizarEppPageModule
      ),
    canLoad: [UsuarioGuard],
  },
  {
    path: "categoria/:categoria",
    loadChildren: () =>
      import("./pages/categoria/categoria.module").then(
        (m) => m.CategoriaPageModule
      ),
  },
  {
    path: "busqueda/:busqueda",
    loadChildren: () =>
      import("./pages/busqueda/busqueda.module").then(
        (m) => m.BusquedaPageModule
      ),
  },
  {
    path: "crear-usuario",
    loadChildren: () =>
      import("./pages/crear-usuario/crear-usuario.module").then(
        (m) => m.CrearUsuarioPageModule
      ),
  },
  {
    path: "solicitud/:id",
    loadChildren: () =>
      import("./pages/solicitud/solicitud.module").then(
        (m) => m.SolicitudPageModule
      ),
  },
  {
    path: "resultado",
    loadChildren: () =>
      import("./pages/resultado/resultado.module").then(
        (m) => m.ResultadoPageModule
      ),
  },
  {
    path: "historial-solicitudes",
    loadChildren: () =>
      import("./pages/historial-solicitudes/historial-solicitudes.module").then(
        (m) => m.HistorialSolicitudesPageModule
      ),
  },
  {
    path: "actualizar-usuario/:id",
    loadChildren: () =>
      import("./pages/actualizar-usuario/actualizar-usuario.module").then(
        (m) => m.ActualizarUsuarioPageModule
      ),
  },
  {
    path: "busqueda-usuario/:busqueda",
    loadChildren: () =>
      import("./pages/busqueda-usuario/busqueda-usuario.module").then(
        (m) => m.BusquedaUsuarioPageModule
      ),
  },
  {
    path: "solicitud-verano",
    loadChildren: () =>
      import("./pages/solicitud-verano/solicitud-verano.module").then(
        (m) => m.SolicitudVeranoPageModule
      ),
    canLoad: [UsuarioGuard],
  },
  {
    path: "solicitud-invierno",
    loadChildren: () =>
      import("./pages/solicitud-invierno/solicitud-invierno.module").then(
        (m) => m.SolicitudInviernoPageModule
      ),
    canLoad: [UsuarioGuard],
  },
  {
    path: "editar-solicitud/:id",
    loadChildren: () =>
      import("./pages/editar-solicitud/editar-solicitud.module").then(
        (m) => m.EditarSolicitudPageModule
      ),
  },
  {
    path: "epps-convenio",
    loadChildren: () =>
      import("./pages/epps-convenio/epps-convenio.module").then(
        (m) => m.EppsConvenioPageModule
      ),
  },
  {
    path: "epp-convenio",
    loadChildren: () =>
      import("./pages/epp-convenio/epp-convenio.module").then(
        (m) => m.EppConvenioPageModule
      ),
  },
  {
    path: "crear-epp-convenio",
    loadChildren: () =>
      import("./pages/crear-epp-convenio/crear-epp-convenio.module").then(
        (m) => m.CrearEppConvenioPageModule
      ),
  },
  {
    path: "editar-epp-convenio/:id",
    loadChildren: () =>
      import("./pages/editar-epp-convenio/editar-epp-convenio.module").then(
        (m) => m.EditarEppConvenioPageModule
      ),
  },
  {
    path: "busqueda-epp-convenio/:busqueda",
    loadChildren: () =>
      import("./pages/busqueda-epp-convenio/busqueda-epp-convenio.module").then(
        (m) => m.BusquedaEppConvenioPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
