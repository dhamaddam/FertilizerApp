import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardRekomendatorPage } from './dashboard-rekomendator.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardRekomendatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRekomendatorPageRoutingModule {}
