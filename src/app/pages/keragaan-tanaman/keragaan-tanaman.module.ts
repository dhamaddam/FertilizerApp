import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanTanamanPageRoutingModule } from './keragaan-tanaman-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';

import { KeragaanTanamanPage } from './keragaan-tanaman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    KeragaanTanamanPageRoutingModule
  ],
  declarations: [KeragaanTanamanPage]
})
export class KeragaanTanamanPageModule {}
