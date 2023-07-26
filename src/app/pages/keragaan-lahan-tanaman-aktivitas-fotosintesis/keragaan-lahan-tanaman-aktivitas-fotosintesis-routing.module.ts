import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeragaanLahanTanamanAktivitasFotosintesisPage } from './keragaan-lahan-tanaman-aktivitas-fotosintesis.page';

const routes: Routes = [
  {
    path: '',
    component: KeragaanLahanTanamanAktivitasFotosintesisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeragaanLahanTanamanAktivitasFotosintesisPageRoutingModule {}
