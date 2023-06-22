import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewKeragaanLahanPageRoutingModule } from './view-keragaan-lahan-routing.module';

import { ViewKeragaanLahanPage } from './view-keragaan-lahan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewKeragaanLahanPageRoutingModule
  ],
  declarations: [ViewKeragaanLahanPage]
})
export class ViewKeragaanLahanPageModule {}
