import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatchInfoPageRoutingModule } from './match-info-routing.module';

import { MatchInfoPage } from './match-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatchInfoPageRoutingModule
  ],
  declarations: [MatchInfoPage]
})
export class MatchInfoPageModule {}
