import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudVeranoPageRoutingModule } from './solicitud-verano-routing.module';

import { SolicitudVeranoPage } from './solicitud-verano.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudVeranoPageRoutingModule
  ],
  declarations: [SolicitudVeranoPage]
})
export class SolicitudVeranoPageModule {}
