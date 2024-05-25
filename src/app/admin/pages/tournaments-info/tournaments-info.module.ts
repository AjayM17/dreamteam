import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsInfoPageRoutingModule } from './tournaments-info-routing.module';

import { TournamentsInfoPage } from './tournaments-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsInfoPageRoutingModule
  ],
  declarations: [TournamentsInfoPage]
})
export class TournamentsInfoPageModule {}
