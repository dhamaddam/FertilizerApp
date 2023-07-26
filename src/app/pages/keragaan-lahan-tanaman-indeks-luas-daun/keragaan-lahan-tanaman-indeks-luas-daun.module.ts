import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanIndeksLuasDaunPageRoutingModule } from './keragaan-lahan-tanaman-indeks-luas-daun-routing.module';

import { KeragaanLahanTanamanIndeksLuasDaunPage } from './keragaan-lahan-tanaman-indeks-luas-daun.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    KeragaanLahanTanamanIndeksLuasDaunPageRoutingModule
  ],
  declarations: [KeragaanLahanTanamanIndeksLuasDaunPage]
})
export class KeragaanLahanTanamanIndeksLuasDaunPageModule {}
