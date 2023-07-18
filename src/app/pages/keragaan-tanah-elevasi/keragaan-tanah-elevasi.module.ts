import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { KeragaanTanahElevasiPageRoutingModule } from './keragaan-tanah-elevasi-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KeragaanTanahElevasiPage } from './keragaan-tanah-elevasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    KeragaanTanahElevasiPageRoutingModule
  ],
  declarations: [KeragaanTanahElevasiPage]
})
export class KeragaanTanahElevasiPageModule {}
