import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayButtonModule } from '../play-button/play-button.module';
import { CardComponent } from './card.component';

@NgModule({
  imports: [
    CommonModule,
    PlayButtonModule,
    RouterModule
  ],
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
