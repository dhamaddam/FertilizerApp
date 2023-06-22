import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagementKebunPageRoutingModule } from './management-kebun-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';

import { ManagementKebunPage } from './management-kebun.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    IonicModule,
    ManagementKebunPageRoutingModule
  ],
  declarations: [ManagementKebunPage]
})
export class ManagementKebunPageModule {}
