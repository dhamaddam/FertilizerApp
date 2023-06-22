import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewManagementKebunPageRoutingModule } from './view-management-kebun-routing.module';

import { ViewManagementKebunPage } from './view-management-kebun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewManagementKebunPageRoutingModule
  ],
  declarations: [ViewManagementKebunPage]
})
export class ViewManagementKebunPageModule {}
