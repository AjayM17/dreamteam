import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsComparisonPageRoutingModule } from './stats-comparison-routing.module';

import { StatsComparisonPage } from './stats-comparison.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    StatsComparisonPageRoutingModule
  ],
  declarations: [StatsComparisonPage]
})
export class StatsComparisonPageModule {}
