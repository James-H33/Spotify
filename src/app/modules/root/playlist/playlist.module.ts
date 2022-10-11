import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayListComponent } from './playlist.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlayListComponent
  ],
  exports: [
    PlayListComponent
  ]
})
export class PlayListModule { }
