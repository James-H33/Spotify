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
  public tracks: any[] = [];
  public displayedColumns: string[] = ['position', 'name', 'album', 'duration'];

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
          .subscribe(res => {
            console.log(res);
            this.tracks = (res as any).items.map((item: any, index: number) => ({ ...item.track, position: index + 1 }));
          });
      });
  }

  public trackSelected(row: any) {
    console.log(row);
  }
}
