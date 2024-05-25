import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children:[{
      path:'login',
      loadChildren:() => import('../admin/pages/login/login.module').then( m => m.LoginPageModule)
    },
    {
      path: 'dashboard',
      loadChildren: () => import('../admin/pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
    },
    // {
    //   path: 'tournaments',
    //   loadChildren: () => import('./pages/tournaments/tournaments.module').then( m => m.TournamentsPageModule)
    // },
    // {
    //   path: 'tournaments-info',
    //   loadChildren: () => import('./pages/tournaments-info/tournaments-info.module').then( m => m.TournamentsInfoPageModule)
    // },
    // {
    //   path: 'players',
    //   loadChildren: () => import('./pages/players/players.module').then( m => m.PlayersPageModule)
    // },
    {
      path: '',
      redirectTo: '/admin/login',
      pathMatch: 'full'
    }]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
