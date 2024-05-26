import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'tournaments',
        loadChildren: () => import('../tournaments/tournaments.module').then(m => m.TournamentsPageModule)
      },
      {
        path: 'players',
        loadChildren: () => import('../players/players.module').then(m => m.PlayersPageModule)
      },
      {
        path: 'tournaments-info',
        loadChildren: () => import('../tournaments-info/tournaments-info.module').then(m => m.TournamentsInfoPageModule)
      },
      {
        path: 'team-info',
        loadChildren: () => import('../team-info/team-info.module').then( m => m.TeamInfoPageModule)
      },
      {
        path: 'match-info',
        loadChildren: () => import('../match-info/match-info.module').then( m => m.MatchInfoPageModule)
      },
      {
        path: '',
        redirectTo: '/admin/dashboard/tournaments',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
