import { userID } from '../helper/constants';
import { DeleteResult, PatchResult } from '../interfaces/IMongo';
import { IWatchlistModel, MinimalWatchlistTicker } from '../interfaces/IWatchlistModel';
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

  private static addUserIdToEndpoint(endpoint: string) {
    return `${endpoint}?userId=${userID}`;
  }

  public static async fetchWatchlistsByUserId(userId: string): Promise<IWatchlistModel[]> {
    // TODO: add pagination
    // const searchQueryLimit = 10;
    const response = await super.fetchData<IWatchlistModel[]>(
      this.addUserIdToEndpoint(`${this.endpoint}/user/${userId}`)
    );
    if (response) {
      return response;
    }
    return [];
  }

  public static async fetchWatchlist(watchlistName: string): Promise<IWatchlistModel | null> {
    const response = await super.fetchData<IWatchlistModel>(
      this.addUserIdToEndpoint(`${this.endpoint}/${watchlistName}`)
    );
    return response;
  }

  public static async createWatchlist(wl: IWatchlistModel): Promise<string | null> {
    const response = await super.postData<string>(this.addUserIdToEndpoint(`${this.endpoint}`), wl);
    return response;
  }

  public static async addStockToWatchlist(
    tickers: MinimalWatchlistTicker[],
    watchlistID: string
  ): Promise<string | null> {
    const response = await super.putData<string>(this.addUserIdToEndpoint(`${this.endpoint}/${watchlistID}`), tickers);
    return response;
  }

  public static async deleteWatchlist(watchlistName: string): Promise<DeleteResult | null> {
    const response = await super.deleteData<DeleteResult>(
      this.addUserIdToEndpoint(`${this.endpoint}/${watchlistName}`)
    );
    return response;
  }

  public static async deleteStocksInWatchlist(
    watchlistName: string,
    tickerSymbols: string[]
  ): Promise<PatchResult | null> {
    const response = await super.patchData<PatchResult>(
      this.addUserIdToEndpoint(`${this.endpoint}/tickers/${watchlistName}`),
      tickerSymbols
    );
    return response;
  }
}
