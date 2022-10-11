import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayerModule } from 'src/app/shared/player/player.module';
import { SideBarModule } from 'src/app/shared/side-bar/side-bar.module';
import { HomeModule } from './home/home.module';
import { PlayListModule } from './playlist/playlist.module';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RootRoutingModule,
    SideBarModule,
    PlayerModule,
    HomeModule,
    PlayListModule
  ],
  exports: []
})
export class RootModule { }
