import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlayListComponent implements OnInit {

  constructor(
    private activeRouter: ActivatedRoute,
    private userService: UserService
  ) { }

  public ngOnInit() {
    this.activeRouter.paramMap
      .pipe(
        tap(map => console.log(map.get('id')))
      )
      .subscribe(() => {
        this.userService.getSavedTracks()
          .subscribe(res => console.log(res));
      });
  }

}
