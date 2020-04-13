import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudInviernoPageRoutingModule } from './solicitud-invierno-routing.module';

import { SolicitudInviernoPage } from './solicitud-invierno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudInviernoPageRoutingModule
  ],
  declarations: [SolicitudInviernoPage]
})
export class SolicitudInviernoPageModule {}
