import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanKandunganKlorofilDaunPageRoutingModule } from './keragaan-lahan-tanaman-kandungan-klorofil-daun-routing.module';

import { KeragaanLahanTanamanKandunganKlorofilDaunPage } from './keragaan-lahan-tanaman-kandungan-klorofil-daun.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanLahanTanamanKandunganKlorofilDaunPageRoutingModule
  ],
  declarations: [KeragaanLahanTanamanKandunganKlorofilDaunPage]
})
export class KeragaanLahanTanamanKandunganKlorofilDaunPageModule {}
