import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanTanahTerasPageRoutingModule } from './keragaan-tanah-teras-routing.module';

import { KeragaanTanahTerasPage } from './keragaan-tanah-teras.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanTanahTerasPageRoutingModule
  ],
  declarations: [KeragaanTanahTerasPage]
})
export class KeragaanTanahTerasPageModule {}
