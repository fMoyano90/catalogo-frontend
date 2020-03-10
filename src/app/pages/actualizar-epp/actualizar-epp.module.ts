import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarEppPageRoutingModule } from './actualizar-epp-routing.module';

import { ActualizarEppPage } from './actualizar-epp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarEppPageRoutingModule
  ],
  declarations: [ActualizarEppPage]
})
export class ActualizarEppPageModule {}
