import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { PlayableEntity, PlayableEntityTrackStrategy } from 'src/app/services/api/models/playable-entity';
import { Track } from 'src/app/services/api/models/track';
import { UserService } from 'src/app/services/api/user.service';
import { IAppState } from 'src/app/services/stores/app-state';
import { SharedActions } from 'src/app/services/stores/shared/shared.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public recentlyPlayed: Track[] = [];
  public playlists: PlayableEntity[] = [];
  public newForYou: Track[] = [];
  public trackCardStrategy = PlayableEntityTrackStrategy;

  public isPlaying$ = this.store.select(s => s.shared.play);
  public currentTrack$: Observable<Track | null> = this.store.select(s => s.shared.currentTrack);

  public vm$ = combineLatest([
    this.isPlaying$,
    this.currentTrack$
  ])
  .pipe(
    map(([isPlaying, currentTrack]) => {
      return {
        isPlaying,
        currentTrack
      };
    })
  );

  constructor(
    private store: Store<IAppState>,
    private userService: UserService,
    private router: Router
  ) { }

  public ngOnInit() {
    this.userService.getTopTracks()
      .subscribe((res: any) => {
        const tracks = res.items.map((x: any) => new Track(x));
        this.recentlyPlayed = tracks.slice(0, 5);
        this.newForYou = tracks.slice(5, 20);
      });

    this.userService.getPlaylists()
      .subscribe((res: any) => {
        const playlists = res.items.map((x: any) => new PlayableEntity(x));
        this.playlists = playlists;
      });
  }

  public trackSelected(entry: { item: PlayableEntity, play: boolean }) {
    this.store.dispatch(SharedActions.SetCurrentTrack(entry.item as Track, entry.play));
  }

  public playlistSelected(item: { item: PlayableEntity, play: boolean }) {
    this.router.navigate(['playlist', item.item.id]);
  }

  public stopPlaying() {
    this.store.dispatch(SharedActions.SetPlaySong(false));
  }
}
