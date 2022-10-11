import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Track } from 'src/app/services/api/models/track';
import { UserService } from 'src/app/services/api/user.service';
import { IAppState } from 'src/app/services/stores/app-state';
import { SharedActions } from 'src/app/services/stores/shared/shared.actions';
import { selectUser } from 'src/app/services/stores/shared/shared.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user$ = this.store.select(selectUser)
    .pipe(
      tap(user => console.log('User: ', user))
    );

  public recentlyPlayed: Track[] = [];
  public newForYou: Track[] = [];

  constructor(
    private store: Store<IAppState>,
    private userService: UserService
  ) { }

  public ngOnInit() {
    this.userService.getTopTracks()
      .subscribe((res: any) => {
        const tracks = res.items.map((x: any) => new Track(x));
        this.recentlyPlayed = tracks.slice(0, 5);
        this.newForYou = tracks.slice(5, 20);
      });
  }

  public trackSelected(item: { track: Track, play: boolean }) {
    this.store.dispatch(SharedActions.SetCurrentTrack(item.track, item.play));
  }
}
