export interface RespuestaProductos {
  ok: boolean;
  pagina: number;
  productos: Producto[];
}

export interface RespuestaUsuarios {
  ok: boolean;
  pagina: number;
  usuarios: Usuario[];
}

export interface RespuestaSolicitudes {
  ok: boolean;
  pagina: number;
  solicitudes: Solicitud[];
}

export interface Producto {
  img?: string[];
  _id?: string;
  material?: string;
  nombre?: string;
  descripcion?: string;
  categoria?: string;
  genero?: string;
  medida?: string;
  created?: string;
}

export interface Usuario {
  _id?: string;
  sap?: number;
  rut?: string;
  nombre?: string;
  genero?: string;
  estado_civil?: string;
  rol?: string;
  contrato?: string;
  aco?: string;
  nacimiento?: string;
  ingreso?: string;
  division?: string;
  centro_costo?: string;
  posicion?: string;
  div_pers?: string;
  funcion?: string;
  organizacion?: string;
  superintendencia?: string;
  gerencia?: string;
  regla_ppl?: string;
  previsiones?: string;
  salud?: string;
  calle?: string;
  villa?: string;
  ciudad?: string;
  comuna?: string;
  telefono?: string;
  region?: string;
  sindicato?: string;
  tipo_socio?: string;
  tipo_usuario?: string;
}

export interface Solicitud {
  usuarioID: string;
  nombre?: string;
  rut?: string;
  sap?: string;
  funcion?: string;
  ubicacion?: string;
  epp1?: string;
  tall1?: string;
  epp2?: string;
  tall2?: string;
  epp3?: string;
  tall3?: string;
  epp4?: string;
  tall4?: string;
  epp5?: string;
  tall5?: string;
  epp6?: string;
  tall6?: string;
  epp7?: string;
  tall7?: string;
  epp8?: string;
  tall8?: string;
  epp9?: string;
  tall9?: string;
  epp10?: string;
  tall10?: string;
  epp11?: string;
  tall11?: string;
  epp12?: string;
  tall12?: string;
  epp13?: string;
  tall13?: string;
  epp14?: string;
  tall14?: string;
  epp15?: string;
  tall15?: string;
  temporada?: string;
  anio?: number;
  mes?: number;
  _id?: string;
}
