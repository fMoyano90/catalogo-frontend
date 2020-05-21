import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "ubicacion",
})
export class UbicacionPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    let nombre: string;

    switch (value) {
      case "los_andes":
        nombre = "Los Andes";
        break;
      case "saladillo":
        nombre = "Saladillo";
        break;
      case "mina_sub":
        nombre = "Mina Subterranea";
        break;
      case "concentrador":
        nombre = "Concentrador";
        break;
      case "huechun":
        nombre = "Huechun";
        break;
      case "sur":
        nombre = "Sur";
        break;
      case "planta_filtro":
        nombre = "Planta de Filtro";
    }

    return nombre;
  }
}
