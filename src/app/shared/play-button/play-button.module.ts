import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlayButtonComponent } from './play-button.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    PlayButtonComponent
  ],
  exports: [
    PlayButtonComponent
  ]
})
export class PlayButtonModule {}
