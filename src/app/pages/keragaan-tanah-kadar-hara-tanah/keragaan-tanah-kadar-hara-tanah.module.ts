import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

import { IonicModule } from '@ionic/angular';

import { KeragaanTanahKadarHaraTanahPageRoutingModule } from './keragaan-tanah-kadar-hara-tanah-routing.module';

import { KeragaanTanahKadarHaraTanahPage } from './keragaan-tanah-kadar-hara-tanah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanTanahKadarHaraTanahPageRoutingModule
  ],
  declarations: [KeragaanTanahKadarHaraTanahPage]
})
export class KeragaanTanahKadarHaraTanahPageModule {}
