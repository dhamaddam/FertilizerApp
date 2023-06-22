import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewManagementKebunPage } from './view-management-kebun.page';

const routes: Routes = [
  {
    path: '',
    component: ViewManagementKebunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewManagementKebunPageRoutingModule {}
