import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewKeragaanTanahPageRoutingModule } from './view-keragaan-tanah-routing.module';

import { ViewKeragaanTanahPage } from './view-keragaan-tanah.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewKeragaanTanahPageRoutingModule
  ],
  declarations: [ViewKeragaanTanahPage]
})
export class ViewKeragaanTanahPageModule {}
