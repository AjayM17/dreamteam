import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'admin/dashboard',
  //   loadChildren: () => import('./admin/pages/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  // },
  {
    path: 'team-players/:id/:name',
    loadChildren: () => import('./admin/pages/team-players/team-players.module').then( m => m.TeamPlayersPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sinup',
    loadChildren: () => import('./user/pages/sinup/sinup.module').then( m => m.SinupPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
