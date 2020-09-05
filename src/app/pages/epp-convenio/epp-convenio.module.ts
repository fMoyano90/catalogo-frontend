import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EppConvenioPageRoutingModule } from './epp-convenio-routing.module';

import { EppConvenioPage } from './epp-convenio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EppConvenioPageRoutingModule
  ],
  declarations: [EppConvenioPage]
})
export class EppConvenioPageModule {}
