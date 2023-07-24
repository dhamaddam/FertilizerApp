import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanTanahKemiringanLerengPage } from './keragaan-tanah-kemiringan-lereng.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanTanahKemiringanLerengPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanTanahKemiringanLerengPageRoutingModule {}
