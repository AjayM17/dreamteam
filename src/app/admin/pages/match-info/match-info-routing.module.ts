import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchInfoPage } from './match-info.page';

const routes: Routes = [
  {
    path: '',
    component: MatchInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchInfoPageRoutingModule {}
