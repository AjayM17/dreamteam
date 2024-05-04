import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamPlayersPageRoutingModule } from './team-players-routing.module';

import { TeamPlayersPage } from './team-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamPlayersPageRoutingModule
  ],
  declarations: [TeamPlayersPage]
})
export class TeamPlayersPageModule {}
