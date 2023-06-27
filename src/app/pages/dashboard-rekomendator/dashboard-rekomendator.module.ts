import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardRekomendatorPageRoutingModule } from './dashboard-rekomendator-routing.module';

import { DashboardRekomendatorPage } from './dashboard-rekomendator.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    DashboardRekomendatorPageRoutingModule
  ],
  declarations: [DashboardRekomendatorPage]
})
export class DashboardRekomendatorPageModule {}
