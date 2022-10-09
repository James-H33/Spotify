import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { first, map, Observable, tap } from "rxjs";
import { IAppState } from "../services/stores/app-state";
import { selectToken } from "../services/stores/shared/shared.selector";

@Injectable({
  providedIn: 'root'
})
export class IsAuthorized implements CanActivate {
  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectToken)
      .pipe(
        first(),
        map(token => token !== ''),
        tap(isLoggedIn  => {
          if (!isLoggedIn) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
}
