import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormPengamatanPage } from './form-pengamatan.page';

const routes: Routes = [
  {
    path: '',
    component: FormPengamatanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormPengamatanPageRoutingModule {}
