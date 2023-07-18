import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

import { KeragaanTanahJenisTanahPageRoutingModule } from './keragaan-tanah-jenis-tanah-routing.module';

import { KeragaanTanahJenisTanahPage } from './keragaan-tanah-jenis-tanah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanTanahJenisTanahPageRoutingModule
  ],
  declarations: [KeragaanTanahJenisTanahPage]
})
export class KeragaanTanahJenisTanahPageModule {}
