import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/api/auth.service';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  public ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }

  public openChromeToAuthorize() {
    this.authService.login();
    this.authService.$state
      .pipe(
        takeUntil(this.$destroy),
        switchMap(state => this.userService.getUser())
      )
      .subscribe((user) => {
        console.log('user', user);

      });
  }
}
