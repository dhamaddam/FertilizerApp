import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanDefisiensiHaraTanamanPageRoutingModule } from './keragaan-lahan-tanaman-defisiensi-hara-tanaman-routing.module';

import { KeragaanLahanTanamanDefisiensiHaraTanamanPage } from './keragaan-lahan-tanaman-defisiensi-hara-tanaman.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanLahanTanamanDefisiensiHaraTanamanPageRoutingModule
  ],
  declarations: [KeragaanLahanTanamanDefisiensiHaraTanamanPage]
})
export class KeragaanLahanTanamanDefisiensiHaraTanamanPageModule {}
