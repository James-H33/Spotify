import { Image } from './image';
import { Track } from './track';

export class PlayableEntity {
  public id?: string;
  public images?: Image[];
  public name?: string;

  constructor(data?: any) {
    const defaults = {
      id: '',
      images: [],
      name: '',
      ...data
    };

    this.id = defaults.id;
    this.images = defaults.images;
    this.name = defaults.name;
  }
}

export enum PlayableEntityType {
  Artist = 'artist',
  Album = 'album',
  Track = 'track',
  Playlist = 'playlist'
}

export class PlayableEntityDefaultStrategy {
  public entity: PlayableEntity;

  constructor(public playableEntity?: PlayableEntity) {
    this.entity = playableEntity || new PlayableEntity();
  }

  public get firstImage() {
    const images = this.entity.images;

    return images && images.length > 0 ? images[0] : { url: '' };
  }
}

export class PlayableEntityTrackStrategy {
  public entity: Track;

  constructor(public track?: Track) {
    this.entity = track || new Track();
  }

  public get firstImage() {
    const images = this.entity.album?.images;

    return images && images.length > 0 ? images[0] : { url: '' };
  }
}
