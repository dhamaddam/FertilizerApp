import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanLahanPageRoutingModule } from './keragaan-lahan-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';

import { KeragaanLahanPage } from './keragaan-lahan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    IonicModule,
    KeragaanLahanPageRoutingModule
  ],
  declarations: [KeragaanLahanPage]
})
export class KeragaanLahanPageModule {}
