import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SideBarModule } from 'src/app/shared/side-bar/side-bar.module';
import { CardModule } from 'src/app/shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    SideBarModule,
    CardModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
