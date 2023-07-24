import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanPertumbuhanTanamanPageRoutingModule } from './keragaan-lahan-tanaman-pertumbuhan-tanaman-routing.module';

import { KeragaanLahanTanamanPertumbuhanTanamanPage } from './keragaan-lahan-tanaman-pertumbuhan-tanaman.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanLahanTanamanPertumbuhanTanamanPageRoutingModule
  ],
  declarations: [KeragaanLahanTanamanPertumbuhanTanamanPage]
})
export class KeragaanLahanTanamanPertumbuhanTanamanPageModule {}
