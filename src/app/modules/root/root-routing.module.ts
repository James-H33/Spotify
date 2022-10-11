import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayListComponent } from './playlist/playlist.component';
import { RootComponent } from './root.component';

const routes  = [
  {
    path: '',
    component: RootComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'playlist/:id', component: PlayListComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class RootRoutingModule { }
