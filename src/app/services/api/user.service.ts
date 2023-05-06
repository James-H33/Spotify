import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { IAppState } from '../stores/app-state';
import { selectToken } from '../stores/shared/shared.selector';
import { AuthService } from './auth.service';
import { TopItemsResponseDto } from './models/dtos/top-items.reponse-dto';
import { TopItemRequestDto } from './models/dtos/top-items.request-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://api.spotify.com/v1';
  private token: string = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private store: Store<IAppState>
  ) {
    this.store.select(selectToken)
      .pipe(
        tap((token: string) => {
          this.token = token;
        })
      ).subscribe();
  }

  public getUser() {
    let url = `${this.baseUrl}/me`;

    const headers = {
      'Authorization': `Bearer ${this.token}`
    }

    return this.http.get(url, { headers });
  }

  public getTopArtists(): Observable<TopItemsResponseDto> {
    let url = `${this.baseUrl}/me/top/artists`;
    const top: any = new TopItemRequestDto();
    const params = new HttpParams()
      .set('limit', top.limit)
      .set('time_range', top.time_range);

    const headers = {
      'Authorization': `Bearer ${this.token}`
    }

    return this.http.get(url, { headers, params });
  }

  public getTopTracks(): Observable<TopItemsResponseDto> {
    let url = `${this.baseUrl}/me/top/tracks`;
    const top: any = new TopItemRequestDto();
    const params = new HttpParams()
      .set('limit', top.limit)
      .set('time_range', top.time_range);

    const headers = {
      'Authorization': `Bearer ${this.token}`
    }

    return this.http.get(url, { headers, params });
  }

  public getPlaylists(): Observable<TopItemsResponseDto> {
    let url = `${this.baseUrl}/me/playlists`;
    const top: any = new TopItemRequestDto();
    const params = new HttpParams()
      .set('limit', top.limit)
      .set('time_range', top.time_range);

    const headers = {
      'Authorization': `Bearer ${this.token}`
    }

    return this.http.get(url, { headers, params });
  }

  public getPlaylistTracks(id: string, offset = 0, limit = 20): Observable<TopItemsResponseDto> {
    let url = `${this.baseUrl}/playlists/${id}`;
    const top: any = new TopItemRequestDto();
    const params = new HttpParams()
      .set('limit', limit)
      .set('time_range', top.time_range)
      .set('offset', offset);

    const headers = {
      'Authorization': `Bearer ${this.token}`
    }

    return this.http.get(url, { headers, params });
  }

  public getSavedTracks(offset = 0, limit = 20): Observable<TopItemsResponseDto> {
    let url = `${this.baseUrl}/me/tracks`;
    const top: any = new TopItemRequestDto();
    const params = new HttpParams()
      .set('limit', limit)
      .set('time_range', top.time_range)
      .set('offset', offset);

    const headers = {
      'Authorization': `Bearer ${this.token}`
    }

    return this.http.get(url, { headers, params });
  }
}
