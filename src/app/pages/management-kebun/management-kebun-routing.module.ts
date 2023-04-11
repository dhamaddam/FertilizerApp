import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementKebunPage } from './management-kebun.page';

const routes: Routes = [
  {
    path: '',
    component: ManagementKebunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementKebunPageRoutingModule {}
