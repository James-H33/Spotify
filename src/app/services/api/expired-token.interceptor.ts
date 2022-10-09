import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of } from 'rxjs';
import { IAppState } from '../stores/app-state';
import { SharedActions } from '../stores/shared/shared.actions';

@Injectable()
export class ExpiredTokenInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.store.dispatch(SharedActions.SetAuthToken(''));
          this.router.navigateByUrl('/login');
        }

        return of(err);
      })
    );
  }
}
