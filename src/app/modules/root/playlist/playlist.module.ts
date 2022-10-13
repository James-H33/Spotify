import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MsToTimePipeModule } from 'src/app/shared/pipes/ms-to-time-pipe.module';
import { PlayListComponent } from './playlist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
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
