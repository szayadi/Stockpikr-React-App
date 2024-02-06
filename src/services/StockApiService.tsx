import axios, { AxiosError, AxiosInstance } from 'axios';
import { ICompanyProfile } from '../interfaces/ICompanyProfile';
import IStockData from '../interfaces/IStockData';
import { IStockQuote } from '../interfaces/IStockQuote';

export class StockApiService {
  //----------------------------------------------------------------//
  //                           Properties
  //----------------------------------------------------------------//

  private static _apiKeyParam = 'apikey=3310f6e51bf5bbdf5643c6d243cfa922';
  private static _apiService: AxiosInstance | null = null;
  public static get apiService(): AxiosInstance {
    if (StockApiService._apiService == null) {
      StockApiService._apiService = axios.create({
        baseURL: 'https://financialmodelingprep.com/api',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      StockApiService._apiService.interceptors.request.use(
        (config) => {
          if (config.method === 'get' && config.url) {
            config.url += (config.url.includes('?') ? '&' : '?') + StockApiService._apiKeyParam;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }
    return StockApiService._apiService;
  }

  //----------------------------------------------------------------//
  //                           Private
  //----------------------------------------------------------------//

  private static async fetchData<T>(url: string): Promise<T | null> {
    try {
      const response = await StockApiService.apiService.get<T>(url);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response != null) {
        console.error('Error fetching company search results:', error.response.data);
        return error.response.data;
      }
    }
    return null;
  }

  //----------------------------------------------------------------//
  //                           Public
  //----------------------------------------------------------------//

  public static async fetchStockSearch(input: string): Promise<IStockData[]> {
    if (input.trim().length === 0) {
      return [];
    }
    const searchQueryLimit = 10;
    const url = `/v3/search?query=${input}&limit=${searchQueryLimit}`;
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
    const url = `/v3/profile/${input}`;
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
    const url = `https://financialmodelingprep.com/api/v3/quote/${input.join(',')}`;
    const response = await StockApiService.fetchData<IStockQuote[]>(url);
    if (response) {
      return response;
    }
    return [];
  }
}
