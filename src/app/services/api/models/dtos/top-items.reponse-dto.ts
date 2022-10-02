import { Artist } from '../artist';

export class TopItemsResponseDto {
  public items?: Artist[];
  public limit?: number;
  public next?: string;
  public offset?: number;
  public previous?: string;
  public total?: number;
}
