import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaktorAlamAnomaliPageRoutingModule } from './faktor-alam-anomali-routing.module';

import { FaktorAlamAnomaliPage } from './faktor-alam-anomali.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FaktorAlamAnomaliPageRoutingModule
  ],
  declarations: [FaktorAlamAnomaliPage]
})
export class FaktorAlamAnomaliPageModule {}
