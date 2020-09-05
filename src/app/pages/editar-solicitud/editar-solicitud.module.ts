import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarSolicitudPageRoutingModule } from './editar-solicitud-routing.module';

import { EditarSolicitudPage } from './editar-solicitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarSolicitudPageRoutingModule
  ],
  declarations: [EditarSolicitudPage]
})
export class EditarSolicitudPageModule {}
