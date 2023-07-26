import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeragaanLahanTanamanAktivitasFotosintesisPageRoutingModule } from './keragaan-lahan-tanaman-aktivitas-fotosintesis-routing.module';

import { KeragaanLahanTanamanAktivitasFotosintesisPage } from './keragaan-lahan-tanaman-aktivitas-fotosintesis.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    IonicModule,
    KeragaanLahanTanamanAktivitasFotosintesisPageRoutingModule
  ],
  declarations: [KeragaanLahanTanamanAktivitasFotosintesisPage]
})
export class KeragaanLahanTanamanAktivitasFotosintesisPageModule {}
