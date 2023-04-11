import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaftarBlokPageRoutingModule } from './daftar-blok-routing.module';

import { DaftarBlokPage } from './daftar-blok.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaftarBlokPageRoutingModule
  ],
  declarations: [DaftarBlokPage]
})
export class DaftarBlokPageModule {}
