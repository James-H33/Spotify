export class TopItemRequestDto {
  public limit?: number;
  public offset?: number;
  public time_range?: string;

  constructor() {
    const defaults = {
      limit: 20,
      offset: 0,
      time_range: 'medium_term'
    }

    Object.assign(this, defaults);
  }
}
