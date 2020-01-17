export interface RespuestaProductos {
  ok: boolean;
  pagina: number;
  productos: Producto[];
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
  nombre?: string;
  email?: string;
  avatar?: string;
  role?: string;
}
