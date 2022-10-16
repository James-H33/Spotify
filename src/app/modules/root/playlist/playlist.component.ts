import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Track } from 'src/app/services/api/models/track';
import { UserService } from 'src/app/services/api/user.service';
import { IAppState } from 'src/app/services/stores/app-state';
import { SharedActions } from 'src/app/services/stores/shared/shared.actions';
import { selectCurrentTrack, selectPlaySong } from 'src/app/services/stores/shared/shared.selector';
import { PlayButtonStyles } from 'src/app/shared/play-button/play-button.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlayListComponent implements OnInit {
  public tracks: any[] = [];
  public displayedColumns: string[] = ['position', 'name', 'album', 'duration'];
  public playButtonStyleType = PlayButtonStyles.Secondary;
  public currentTrack?: Track = new Track();
  public hoveredTrackId: any = null;
  public totalSongs: number = 0;

  public isTrackPlaying$ = this.store.select(selectPlaySong);
  public currentTrack$ = this.store.select(selectCurrentTrack)
    .pipe(
      tap((track: any) => this.currentTrack = track)
    ).subscribe();

  constructor(
    private activeRouter: ActivatedRoute,
    private userService: UserService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit() {
    this.activeRouter.paramMap
      .subscribe(() => {
        this.userService.getSavedTracks()
          .subscribe(res => {
            this.totalSongs = (res as any).total;

            this.tracks = (res as any).items.map((item: any, index: number) => {
              const track = new Track(item.track);
              (track as any).position = index + 1;

              return track;
            });

          });
      });
  }

  public trackSelected(row: any) {
    console.log(row);
  }

  public trackHover(row: any) {
    this.hoveredTrackId = row.id;
  }

  public tableMouseout() {
    this.hoveredTrackId = null;
  }

  public playTrack(track: Track) {
    this.store.dispatch(SharedActions.SetCurrentTrack(track, true));
  }
}
