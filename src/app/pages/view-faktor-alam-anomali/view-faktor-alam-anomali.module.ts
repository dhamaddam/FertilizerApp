import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFaktorAlamAnomaliPageRoutingModule } from './view-faktor-alam-anomali-routing.module';

import { ViewFaktorAlamAnomaliPage } from './view-faktor-alam-anomali.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFaktorAlamAnomaliPageRoutingModule
  ],
  declarations: [ViewFaktorAlamAnomaliPage]
})
export class ViewFaktorAlamAnomaliPageModule {}
