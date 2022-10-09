import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, filter, map, of, switchMap, tap } from 'rxjs';
import { IAppState } from 'src/app/services/stores/app-state';
import { SharedActions } from 'src/app/services/stores/shared/shared.actions';
import { selectCurrentTrack, selectPlaySong } from 'src/app/services/stores/shared/shared.selector';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  public currentTrack$ = this.store.select(selectCurrentTrack)
    .pipe(
      tap(() => this.audioPlayer?.pause()),
      tap(() => this.resetAudioTime()),
      tap(() => this.stopCurrentTimeUpdater()),
      tap((t: any) => this.audioPlayer = new Audio(t?.preview_url)),
      switchMap((t) =>
        combineLatest([
            of(t),
            this.canPlay().pipe(filter(isDone => isDone))
          ])
      ),
      tap(([t, _]) => this.setDurationTime()),
      map(([track, _]) => track)
    );

  public playSong$ = this.store.select(selectPlaySong);

  public songMediator$ = combineLatest([
    this.currentTrack$,
    this.playSong$
  ])
    .pipe(
      tap(([t, play]) => this.playCurrentTrack(play))
    ).subscribe();

  public currentTime = '00:00';
  public duration = '00:00';
  public currentTimeAsNum = 0;
  public durationAsNum = 0;

  private audioPlayer = new Audio();
  private interval: any = null;

  constructor(
    private store: Store<IAppState>
  ) { }

  public togglePlay(play: boolean) {
    this.store.dispatch(SharedActions.SetPlaySong(play));
  }

  private playCurrentTrack(playSong: boolean) {
    this.audioPlayer.volume = 0.5;

    if (playSong) {
      this.audioPlayer.play();
      this.initCurrentTimeUpdater();
    } else {
      this.audioPlayer.pause();
      this.stopCurrentTimeUpdater();
    }
  }

  private initCurrentTimeUpdater() {
    this.stopCurrentTimeUpdater();
    this.durationAsNum = Math.floor(this.audioPlayer.duration);

    this.interval = setInterval(() => {
      this.currentTimeAsNum = Math.floor(this.audioPlayer.currentTime);
      this.currentTime = this.msToTime(this.audioPlayer.currentTime * 1000 || 0);
    }, 250);
  }

  private stopCurrentTimeUpdater() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private setDurationTime() {
    const audio = this.audioPlayer;
    this.duration = this.msToTime(audio.duration * 1000 || 0);
  }

  private resetAudioTime() {
    this.currentTime = this.msToTime(0);
    this.currentTimeAsNum = 0;
    this.durationAsNum = 0;
  }

  private canPlay() {
    const done = new BehaviorSubject(false);

    this.audioPlayer.addEventListener('canplay', (event) => {
      done.next(true);
      done.complete();
    });

    return done;
  }

  private msToTime(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs;
  }
}
