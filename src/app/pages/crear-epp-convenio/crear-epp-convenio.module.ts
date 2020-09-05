import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearEppConvenioPageRoutingModule } from './crear-epp-convenio-routing.module';

import { CrearEppConvenioPage } from './crear-epp-convenio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearEppConvenioPageRoutingModule
  ],
  declarations: [CrearEppConvenioPage]
})
export class CrearEppConvenioPageModule {}
