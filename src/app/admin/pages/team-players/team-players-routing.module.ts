import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamPlayersPage } from './team-players.page';

const routes: Routes = [
  {
    path: '',
    component: TeamPlayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamPlayersPageRoutingModule {}
