import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanLahanMenuProduksiPageRoutingModule } from './keragaan-lahan-menu-produksi-routing.module';

import { KeragaanLahanMenuProduksiPage } from './keragaan-lahan-menu-produksi.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanLahanMenuProduksiPageRoutingModule
  ],
  declarations: [KeragaanLahanMenuProduksiPage]
})
export class KeragaanLahanMenuProduksiPageModule {}
