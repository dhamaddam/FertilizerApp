import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanStressAirTanamanPageRoutingModule } from './keragaan-lahan-tanaman-stress-air-tanaman-routing.module';

import { KeragaanLahanTanamanStressAirTanamanPage } from './keragaan-lahan-tanaman-stress-air-tanaman.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanLahanTanamanStressAirTanamanPageRoutingModule
  ],
  declarations: [KeragaanLahanTanamanStressAirTanamanPage]
})
export class KeragaanLahanTanamanStressAirTanamanPageModule {}
