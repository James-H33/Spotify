import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { TrackCardModule } from 'src/app/shared/track-card/track-card.module';

@NgModule({
  imports: [
    CommonModule,
    TrackCardModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
