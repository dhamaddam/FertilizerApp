import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanTanahTopografiPageRoutingModule } from './keragaan-tanah-topografi-routing.module';

import { KeragaanTanahTopografiPage } from './keragaan-tanah-topografi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeragaanTanahTopografiPageRoutingModule
  ],
  declarations: [KeragaanTanahTopografiPage]
})
export class KeragaanTanahTopografiPageModule {}
