import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MrzPage } from './mrz.page';

const routes: Routes = [
  {
    path: '',
    component: MrzPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MrzPageRoutingModule {}
