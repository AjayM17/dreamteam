import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentsInfoPage } from './tournaments-info.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentsInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsInfoPageRoutingModule {}
