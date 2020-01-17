import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizerPipe } from "./dom-sanitizer.pipe";
import { DomSanitizer } from "@angular/platform-browser";

@NgModule({
  declarations: [DomSanitizerPipe],
  exports: [DomSanitizerPipe]
})
export class PipesModule {}
