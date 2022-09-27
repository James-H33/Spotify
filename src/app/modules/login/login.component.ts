import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/api/auth.service';
import { UserService } from 'src/app/services/api/user.service';
import { IAppState } from 'src/app/services/stores/app-state';
import { SharedActions } from 'src/app/services/stores/shared/shared.actions';
import { selectToken } from 'src/app/services/stores/shared/shared.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private store: Store<IAppState>,
    private userService: UserService,
    private router: Router
  ) { }

  public ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }

  public openChromeToAuthorize() {
    this.store.select(selectToken)
      .pipe(
        takeUntil(this.$destroy),
        tap(token => console.log('Token: ', token)),
        filter(token => token !== ''),
        switchMap(_ => this.userService.getUser())
      )
      .subscribe((user) => {
        // debugger;
        // console.log(user);
        this.store.dispatch(SharedActions.SetUser(user));
        this.router.navigate(['']);
      });

    this.authService.login();
  }
}
