import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlayerCardComponent } from './player-card/player-card.component';
import { PipeModule } from '../pipes/pipe.module';


@NgModule({
  declarations: [PlayerCardComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipeModule,
    FormsModule
  ],
  exports: [PlayerCardComponent]
})
export class ComponentsModule { }
