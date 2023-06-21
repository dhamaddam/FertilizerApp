import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondPageRoutingModule } from './second-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';

import { SecondPage } from './second.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SecondPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [SecondPage]
})
export class SecondPageModule {}
