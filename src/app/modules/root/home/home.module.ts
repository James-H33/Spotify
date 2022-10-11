import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CardModule } from 'src/app/shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
