import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaktorAlamAnomaliPage } from './faktor-alam-anomali.page';

const routes: Routes = [
  {
    path: '',
    component: FaktorAlamAnomaliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaktorAlamAnomaliPageRoutingModule {}
