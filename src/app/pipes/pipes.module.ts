import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizerPipe } from "./dom-sanitizer.pipe";
import { DomSanitizer } from "@angular/platform-browser";
import { ImageSanitizerPipe } from "./image-sanitizer.pipe";
import { ImagenPipe } from "./imagen.pipe";
import { UbicacionPipe } from "./ubicacion.pipe";

@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe,
    UbicacionPipe,
  ],
  exports: [DomSanitizerPipe, ImageSanitizerPipe, ImagenPipe, UbicacionPipe],
})
export class PipesModule {}
