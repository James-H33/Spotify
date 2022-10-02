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

export class Track {
  public album?: any;
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
}
