import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaEppConvenioPageRoutingModule } from './busqueda-epp-convenio-routing.module';

import { BusquedaEppConvenioPage } from './busqueda-epp-convenio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaEppConvenioPageRoutingModule
  ],
  declarations: [BusquedaEppConvenioPage]
})
export class BusquedaEppConvenioPageModule {}
