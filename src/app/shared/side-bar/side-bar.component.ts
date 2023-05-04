import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/services/stores/app-state';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  public isLoggedIn$ = this.store.select(state => state.shared.isLoggedIn);

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
  }

}
