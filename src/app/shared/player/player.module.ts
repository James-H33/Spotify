import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { PlayButtonModule } from '../play-button/play-button.module';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { PlayerComponent } from './player.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    PlayButtonModule,
    ProgressBarModule
  ],
  declarations: [
    PlayerComponent
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
