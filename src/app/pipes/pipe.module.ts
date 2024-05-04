import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighScore } from './custom.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HighScore],
  exports: [HighScore]
})
export class PipeModule { }
