/*
  album_type: "SINGLE"
  artists: [Object] (1)
  available_markets: ["AD", "AE", "AR", "AT", "AU", "BE", "BG", "BH", "BO", "BR", …] (79)
  external_urls: {spotify: "https://open.spotify.com/album/4kbT7O8zsXUw8CZvhBR46i"}
  href: "https://api.spotify.com/v1/albums/4kbT7O8zsXUw8CZvhBR46i"
  id: "4kbT7O8zsXUw8CZvhBR46i"
  images: [{height: 640, url: "https://i.scdn.co/image/ab67616d0000b273cfadf73b73ba2fbcbbf549de", width: 640}, {height: 300, url: "https://i.scdn.co/image/ab67616d00001e02cfadf73b73ba2fbcbbf549de", width: 300}, {height: 64, url: "https://i.scdn.co/image/ab67616d00004851cfadf73b73ba2fbcbbf549de", width: 64}] (3)
  name: "Thought You Should Know"
  release_date: "2022-05-06"
  release_date_precision: "day"
  total_tracks: 1
  type: "album"
  uri: "spotify:album:4kbT7O8zsXUw8CZvhBR46i"
*/

import { Image } from './image';

export class Album {
  public album_type?: string;
  public artists?: any[];
  public available_markets?: string[];
  public external_urls?: any;
  public href?: string;
  public id?: string;
  public images?: Image[];
  public name?: string;
  public release_date?: string;
  public release_date_precision?: string;
  public total_tracks?: number;
  public type?: string;
  public uri?: string;
}
