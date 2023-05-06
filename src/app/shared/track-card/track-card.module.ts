import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayButtonModule } from '../play-button/play-button.module';
import { TrackCardComponent } from './track-card.component';

@NgModule({
  imports: [
    CommonModule,
    PlayButtonModule,
    RouterModule
  ],
  declarations: [
    TrackCardComponent
  ],
  exports: [
    TrackCardComponent
  ]
})
export class TrackCardModule { }
