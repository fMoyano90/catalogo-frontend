import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarEppConvenioPageRoutingModule } from './editar-epp-convenio-routing.module';

import { EditarEppConvenioPage } from './editar-epp-convenio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarEppConvenioPageRoutingModule
  ],
  declarations: [EditarEppConvenioPage]
})
export class EditarEppConvenioPageModule {}
