import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanBiomassaPageRoutingModule } from './keragaan-lahan-tanaman-biomassa-routing.module';

import { KeragaanLahanTanamanBiomassaPage } from './keragaan-lahan-tanaman-biomassa.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanLahanTanamanBiomassaPageRoutingModule
  ],
  declarations: [KeragaanLahanTanamanBiomassaPage]
})
export class KeragaanLahanTanamanBiomassaPageModule {}
