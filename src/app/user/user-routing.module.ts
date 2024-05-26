import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children:[{
      path:'login',
      loadChildren:() => import('../user/pages/login/login.module').then( m => m.LoginPageModule)
    },
    {
      path: 'dashboard',
      loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
    },
    {
      path: 'signup',
      loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
    },
    {
      path: 'stats-comparison',
      loadChildren: () => import('./pages/stats-comparison/stats-comparison.module').then( m => m.StatsComparisonPageModule)
    },
    {
      path: '',
      redirectTo: '/user/login',
      pathMatch: 'full'
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
