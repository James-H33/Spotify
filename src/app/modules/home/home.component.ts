import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
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

  public recentlyPlayed = [1, 2, 3, 4];

  constructor(
    private store: Store<IAppState>,
    private userService: UserService
  ) { }

  public ngOnInit() {
    this.userService.getTopItems()
      .subscribe(res => console.log(res));
  }

}
