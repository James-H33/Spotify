/*
  album: {album_type: "SINGLE", artists: Array, available_markets: Array, external_urls: {spotify: "https://open.spotify.com/album/4kbT7O8zsXUw8CZvhBR46i"}, href: "https://api.spotify.com/v1/albums/4kbT7O8zsXUw8CZvhBR46i", …}
  artists: [Object] (1)
  available_markets: ["AD", "AE", "AR", "AT", "AU", "BE", "BG", "BH", "BO", "BR", …] (79)
  disc_number: 1
  duration_ms: 215571
  explicit: true
  external_ids: {isrc: "USUG12202977"}
  external_urls: {spotify: "https://open.spotify.com/track/6NHpyYvJyQsg2nXXzGYc2R"}
  href: "https://api.spotify.com/v1/tracks/6NHpyYvJyQsg2nXXzGYc2R"
  id: "6NHpyYvJyQsg2nXXzGYc2R"
  is_local: false
  name: "Thought You Should Know"
  popularity: 79
  preview_url: "https://p.scdn.co/mp3-preview/bb09f02896f898bdf18ef98fb5c722aa90a7cc15?cid=fda86a2ffb1f42268b0e0198861006e9"
  track_number: 1
  type: "track"
  uri: "spotify:track:6NHpyYvJyQsg2nXXzGYc2R"
*/

import { Album } from './album';
import { Image } from './image';
import { PlayableEntity } from './playable-entity';

export class Track implements PlayableEntity {
  public album?: Album;
  public artists?: any[];
  public available_markets?: string[];
  public disc_number?: number;
  public duration_ms?: number;
  public explicit?: boolean;
  public external_ids?: any;
  public external_urls?: any;
  public href?: string;
  public id?: string;
  public is_local?: boolean;
  public name?: string;
  public popularity?: number;
  public preview_url?: string;
  public track_number?: number;
  public type?: string;
  public uri?: string;

  constructor(data?: any) {
    const defaults = {
      album: new Album(),
      artists: [],
      available_markets: [],
      disc_number: 0,
      duration_ms: 0,
      explicit: false,
      external_ids: {},
      external_urls: {},
      href: '',
      id: '',
      is_local: false,
      name: '',
      popularity: 0,
      preview_url: '',
      track_number: 0,
      type: '',
      uri: '',
      ...data
    };

    this.album = defaults.album;
    this.artists = defaults.artists;
    this.available_markets = defaults.available_markets;
    this.disc_number = defaults.disc_number;
    this.duration_ms = defaults.duration_ms;
    this.explicit = defaults.explicit;
    this.external_ids = defaults.external_ids;
    this.external_urls = defaults.external_urls;
    this.href = defaults.href;
    this.id = defaults.id;
    this.is_local = defaults.is_local;
    this.name = defaults.name;
    this.popularity = defaults.popularity;
    this.preview_url = defaults.preview_url;
    this.track_number = defaults.track_number;
    this.type = defaults.type;
    this.uri = defaults.uri;
  }

  public get firstImage(): Image {
    return this.album?.images?.[0] as any;
  }
}
