export interface RespuestaProductos {
  ok: boolean;
  pagina: number;
  productos: Producto[];
}
export interface RespuestaEppsConvenio {
  ok: boolean;
  pagina: number;
  epps: EppConvenio[];
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
  centro_costo?: string;
  ubicacion?: string;
  cargo?: string;
  tipo_usuario?: string;
}

export interface Solicitud {
  usuarioID: string;
  nombre: string;
  rut: string;
  sap: string;
  genero: string;
  funcion: string;
  ubicacion: string;
  centro_costo: string;
  lugar_retiro: string;
  cargo_actual: string;
  epps: Epp[];
  temporada?: string;
  anio?: number;
  mes?: number;
  _id?: string;
}

export interface Convenio {
  codigo: string;
  epp: string;
  salacom: string;
  los_andes: string;
  huechun: string;
  saladillo: string;
  planta_filtro: string;
  sur: string;
  mina_sub: string;
  concentrador: string;
  hombre: string;
  mujer: string;
  verano: string;
  invierno: string;
  mecanico: string;
  electrico: string;
  general: string;
  añoxmedio: string;
  tipo: string;
  talla: string;
}

export interface Epp {
  codigo: number;
  talla: string;
  nombre: string;
}

export interface EppConvenio {
  codigo: string;
  epp: string;
  salacom: string;
  los_andes: string;
  huechun: string;
  saladillo: string;
  planta_filtro: string;
  hombre: string;
  mujer: string;
  verano: string;
  invierno: string;
  mecanico: string;
  electrico: string;
  general: string;
  anioxmedio: string;
  tipo: string;
  talla: string;
  _id?: string;
}
