import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPengamatanPageRoutingModule } from './form-pengamatan-routing.module';

import { FormPengamatanPage } from './form-pengamatan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormPengamatanPageRoutingModule
  ],
  declarations: [FormPengamatanPage]
})
export class FormPengamatanPageModule {}
