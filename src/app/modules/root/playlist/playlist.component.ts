import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, concat, delay, filter, first, map, tap } from 'rxjs';
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
  @ViewChild('LoadTracksAnchor')
  public set loadTracksAnchor(el: ElementRef) {
    if (this._loadTracksAnchor) {
      return;
    }

    this._loadTracksAnchor = el;
    this.watchForIntersection();
  }

  private _loadTracksAnchor: any = null;

  public tracks: any[] = [];
  public displayedColumns: string[] = ['position', 'name', 'album', 'duration'];
  public playButtonStyleType = PlayButtonStyles.Secondary;
  public currentTrack?: Track = new Track();
  public hoveredTrackId: any = null;
  public totalSongs: number = 0;
  public currentOffset = 0;
  public name = '';

  public isTrackPlaying$ = this.store.select(selectPlaySong);
  public currentTrack$ = this.store.select(selectCurrentTrack)
    .pipe(
      tap((track: any) => this.currentTrack = track)
    );

  public observerTriggered$ = new BehaviorSubject(null);
  public initialTracksLoaded$ = new BehaviorSubject<any[]>([]);

  public vm$ = combineLatest([
    this.isTrackPlaying$,
    this.currentTrack$,
    this.initialTracksLoaded$
  ])
    .pipe(
      map(([isPlaying, currentTrack, tracks]) => {
        return {
          isPlaying,
          currentTrack,
          tracks
        };
      })
    )

  public handleLoadMoreTracks$ = concat(
    this.initialTracksLoaded$
      .pipe(
        filter((tracks: any[]) => tracks.length > 0),
        delay(1000),
        first()
      ),
    this.observerTriggered$
      .pipe(
        tap((observedEntry: any) => {
          if (observedEntry.isIntersecting) {
            this.getMoreTracks();
          }
        })
      )
  ).subscribe();

  constructor(
    private activeRouter: ActivatedRoute,
    private userService: UserService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit() {
    this.activeRouter.paramMap
      .pipe(
        map(params => params.get('id') as string)
      )
      .subscribe((id: string) => {
        if (id === 'liked') {
          this.userService.getSavedTracks(this.currentOffset)
            .subscribe((res: any) => {
              this.name = 'Liked Songs';
              this.totalSongs = res.total;
              this.tracks = this.mapTrackToTableItem(res.items, this.currentOffset);
              this.initialTracksLoaded$.next(this.tracks);
            });
        } else {
          this.userService.getPlaylistTracks(id, this.currentOffset)
            .subscribe((res: any) => {
              this.name = res.name;
              this.totalSongs = res.tracks.total;
              this.tracks = this.mapTrackToTableItem(res.tracks?.items, this.currentOffset);
              this.initialTracksLoaded$.next(this.tracks);
            });
        }
      });
  }

  public trackSelected(track: Track) {
    this.store.dispatch(SharedActions.SetCurrentTrack(track, false));
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

  private watchForIntersection() {
    let options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const callback = (observers: any) => {
      this.observerTriggered$.next(observers[0]);
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(this._loadTracksAnchor.nativeElement);
  }

  private getMoreTracks() {
    this.currentOffset = this.currentOffset + 20;

    this.userService.getSavedTracks(this.currentOffset)
      .subscribe((res: any) => {
        const tracks = this.mapTrackToTableItem(res.items, this.currentOffset);
        this.tracks = [...this.tracks, ...tracks];
      });
  }

  private mapTrackToTableItem(tracks: Track[], startIndex = 0) {
    return tracks.map((item: any, i: number) => {
      const track = new Track(item.track);
      (track as any).position = startIndex + i + 1;

      return track;
    });
  }
}
