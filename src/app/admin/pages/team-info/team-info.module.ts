import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamInfoPageRoutingModule } from './team-info-routing.module';

import { TeamInfoPage } from './team-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamInfoPageRoutingModule
  ],
  declarations: [TeamInfoPage]
})
export class TeamInfoPageModule {}
