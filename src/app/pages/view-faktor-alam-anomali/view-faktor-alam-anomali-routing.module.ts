import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFaktorAlamAnomaliPage } from './view-faktor-alam-anomali.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFaktorAlamAnomaliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFaktorAlamAnomaliPageRoutingModule {}
