import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
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
  public volumeControl = {
    max: 1,
    min: 0,
    step: 0.01,
    value: 0.5
  };

  public hasTrack = false;

  public currentTrack$ = this.store.select(selectCurrentTrack)
    .pipe(
      tap(track => track ? this.hasTrack = true : this.hasTrack = false),
      tap(() => this.audioPlayer?.pause()),
      tap(() => this.resetAudioTime()),
      tap(() => this.stopCurrentTimeUpdater()),
      tap((t: any) => this.audioPlayer = new Audio(t?.preview_url)),
      tap((t: any) => this.audioPlayer.volume = this.volumeControl.value),
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

  public togglePlay({ event, play }: any) {
    if (!this.hasTrack) {
      return;
    }

    this.store.dispatch(SharedActions.SetPlaySong(play));
  }

  public updateVolume(change: MatSliderChange) {
    const value = change.value ?? 0.5;
    this.volumeControl.value = value;
    this.audioPlayer.volume = value;
  }

  public updateCurrentTime(change: MatSliderChange) {
    const value = change.value ?? this.audioPlayer.currentTime;

    if (value === this.audioPlayer.currentTime) {
      return;
    }

    this.audioPlayer.currentTime = value;
  }

  private playCurrentTrack(playSong: boolean) {
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
      this.currentTimeAsNum = this.audioPlayer.currentTime;
      this.currentTime = this.msToTime(this.audioPlayer.currentTime * 1000 || 0);

      if (this.currentTimeAsNum >= this.durationAsNum) {
        this.stopCurrentTimeUpdater();
        this.store.dispatch(SharedActions.SetPlaySong(false));
      }
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
