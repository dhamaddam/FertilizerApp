import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardRekomendatorPageRoutingModule } from './dashboard-rekomendator-routing.module';

import { DashboardRekomendatorPage } from './dashboard-rekomendator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRekomendatorPageRoutingModule
  ],
  declarations: [DashboardRekomendatorPage]
})
export class DashboardRekomendatorPageModule {}
