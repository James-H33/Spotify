import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MsToTimePipeModule } from 'src/app/shared/pipes/ms-to-time-pipe.module';
import { PlayButtonModule } from 'src/app/shared/play-button/play-button.module';
import { PlayListComponent } from './playlist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlayButtonModule,
    MatTableModule,
    MatIconModule,
    MsToTimePipeModule
  ],
  declarations: [
    PlayListComponent
  ],
  exports: [
    PlayListComponent
  ]
})
export class PlayListModule { }
