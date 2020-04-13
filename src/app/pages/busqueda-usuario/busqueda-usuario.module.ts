import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaUsuarioPageRoutingModule } from './busqueda-usuario-routing.module';

import { BusquedaUsuarioPage } from './busqueda-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaUsuarioPageRoutingModule
  ],
  declarations: [BusquedaUsuarioPage]
})
export class BusquedaUsuarioPageModule {}
