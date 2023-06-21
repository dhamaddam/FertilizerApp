import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanTanahPageRoutingModule } from './keragaan-tanah-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';

import { KeragaanTanahPage } from './keragaan-tanah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IonicSelectableModule,
    KeragaanTanahPageRoutingModule
  ],
  declarations: [KeragaanTanahPage]
})
export class KeragaanTanahPageModule {}
