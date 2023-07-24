import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KeragaanTanahTopografiPageRoutingModule } from './keragaan-tanah-topografi-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { KeragaanTanahTopografiPage } from './keragaan-tanah-topografi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanTanahTopografiPageRoutingModule
  ],
  declarations: [KeragaanTanahTopografiPage]
})
export class KeragaanTanahTopografiPageModule {}
