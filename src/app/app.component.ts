import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { take, tap } from "rxjs/operators";
import { UserService } from "./services/api/user.service";
import { IAppState } from "./services/stores/app-state";
import { SharedActions } from "./services/stores/shared/shared.actions";

@Component({
  selector: "app-root",
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<IAppState>,
    private userService: UserService
  ) {}

  public ngOnInit() {
    let token = localStorage.getItem('access_token') || '';

    if (token) {
      this.store.dispatch(SharedActions.SetAuthToken(token));
      this.userService.getUser()
        .pipe(
          take(1),
          tap(user => this.store.dispatch(SharedActions.SetUser(user)))
        ).subscribe();
    }
  }
}
