import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewKeragaanTanamanPageRoutingModule } from './view-keragaan-tanaman-routing.module';

import { ViewKeragaanTanamanPage } from './view-keragaan-tanaman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewKeragaanTanamanPageRoutingModule
  ],
  declarations: [ViewKeragaanTanamanPage]
})
export class ViewKeragaanTanamanPageModule {}
