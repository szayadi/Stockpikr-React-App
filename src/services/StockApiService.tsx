import { ICompanyProfile } from '../interfaces/ICompanyProfile';
import IStockData from '../interfaces/IStockData';
import { IStockQuote } from '../interfaces/IStockQuote';
import { BaseApiService } from './ApiService';

export class StockApiService extends BaseApiService {
  protected static endpoint = `${this.baseEndpoint}/stockdata/`;

  //----------------------------------------------------------------//
  //                           Public
  //----------------------------------------------------------------//

  public static async fetchStockSearch(input: string): Promise<IStockData[]> {
    if (input.trim().length === 0) {
      return [];
    }
    // TODO: add pagination
    const searchQueryLimit = 10;
    const url = `${this.endpoint}${input}?limit=${searchQueryLimit}`;
    const response = await StockApiService.fetchData<IStockData[]>(url);
    if (response) {
      return response;
    }
    return [];
  }
  public static async fetchCompanyProfile(input: string): Promise<ICompanyProfile[]> {
    if (input.trim().length === 0) {
      return [];
    }
    const url = `${this.endpoint}profile/${input}`;
    const response = await StockApiService.fetchData<ICompanyProfile[]>(url);
    if (response) {
      return response;
    }
    return [];
  }
  public static async fetchStockQuote(input: string[]): Promise<IStockQuote[]> {
    if (input.length === 0) {
      return [];
    }
    const url = `/api/lateststockinfo/quotes/${input}`;
    const response = await StockApiService.fetchData<IStockQuote[]>(url);
    if (response) {
      return response;
    }
    return [];
  }
}
