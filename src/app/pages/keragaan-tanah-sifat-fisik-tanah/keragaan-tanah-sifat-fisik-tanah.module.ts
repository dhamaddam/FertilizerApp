import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KeragaanTanahSifatFisikTanahPageRoutingModule } from './keragaan-tanah-sifat-fisik-tanah-routing.module';

import { KeragaanTanahSifatFisikTanahPage } from './keragaan-tanah-sifat-fisik-tanah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    KeragaanTanahSifatFisikTanahPageRoutingModule
  ],
  declarations: [KeragaanTanahSifatFisikTanahPage]
})
export class KeragaanTanahSifatFisikTanahPageModule {}
