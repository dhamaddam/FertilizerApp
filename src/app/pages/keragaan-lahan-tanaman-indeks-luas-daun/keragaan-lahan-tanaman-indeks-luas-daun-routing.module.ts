import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanLahanTanamanIndeksLuasDaunPage } from './keragaan-lahan-tanaman-indeks-luas-daun.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanLahanTanamanIndeksLuasDaunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanLahanTanamanIndeksLuasDaunPageRoutingModule {}
