import { DeleteResult } from '../interfaces/IMongo';
import { IWatchlistModel } from '../interfaces/IWatchlistModel';
import { BaseApiService } from './ApiService';

export class WatchlistApiService extends BaseApiService {
  protected static endpoint = `${this.baseEndpoint}/watchlists`;
  //----------------------------------------------------------------//
  //                           Public
  //----------------------------------------------------------------//

  public static async fetchWatchlists(): Promise<IWatchlistModel[]> {
    // TODO: add pagination
    // const searchQueryLimit = 10;
    const response = await super.fetchData<IWatchlistModel[]>(this.baseEndpoint);
    if (response) {
      return response;
    }
    return [];
  }

  public static async fetchWatchListsByUserId(userId: string): Promise<IWatchlistModel[]> {
    // TODO: add pagination
    //const searchQueryLimit = 10;
    const response = await super.fetchData<IWatchlistModel[]>(`${this.endpoint}/user/${userId}`);
    if (response) {
      return response;
    }
    return [];
  }

  public static async fetchWatchlist(watchlistName: string): Promise<IWatchlistModel | null> {
    const response = await super.fetchData<IWatchlistModel>(`${this.endpoint}/${watchlistName}`);
    return response;
  }

  public static async createWatchlist(wl: Omit<IWatchlistModel, 'watchlistID'>): Promise<string | null> {
    const response = await super.postData<string>(`${this.endpoint}`, wl);
    return response;
  }

  public static async deleteWatchlist(watchlistName: string): Promise<DeleteResult | null> {
    const response = await super.deleteData<DeleteResult>(`${this.endpoint}/${watchlistName}`);
    return response;
  }
}
