import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Artist } from 'src/app/services/api/models/artist';
import { UserService } from 'src/app/services/api/user.service';
import { IAppState } from 'src/app/services/stores/app-state';
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

  public recentlyPlayed: Artist[] = [];
  public newForYou: Artist[] = [];

  constructor(
    private store: Store<IAppState>,
    private userService: UserService
  ) { }

  public ngOnInit() {
    this.userService.getTopTracks()
      .subscribe((res: any) => {
        this.recentlyPlayed = res.items.slice(0, 5);
        this.newForYou = res.items.slice(5, 20);
      });
  }
}
