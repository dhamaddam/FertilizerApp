import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanTanahKemiringanLerengPageRoutingModule } from './keragaan-tanah-kemiringan-lereng-routing.module';

import { KeragaanTanahKemiringanLerengPage } from './keragaan-tanah-kemiringan-lereng.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanTanahKemiringanLerengPageRoutingModule
  ],
  declarations: [KeragaanTanahKemiringanLerengPage]
})
export class KeragaanTanahKemiringanLerengPageModule {}
