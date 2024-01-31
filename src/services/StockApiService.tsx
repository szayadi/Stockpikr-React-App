import axios, { AxiosError, AxiosInstance } from 'axios';
import { ICompanyProfile } from '../interfaces/ICompanyProfile';
import IStockData from '../interfaces/IStockData';

export class StockApiService {
  //----------------------------------------------------------------//
  //                           Properties
  //----------------------------------------------------------------//

  private static _apiService: AxiosInstance | null = null;
  public static get apiService(): AxiosInstance {
    if (StockApiService._apiService == null) {
      StockApiService._apiService = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json'
        }
      });
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
      }
    }
    return null;
  }

  //----------------------------------------------------------------//
  //                           Public
  //----------------------------------------------------------------//

  public static async fetchListStockData(input: string, limit?: number): Promise<IStockData[]> {
    if (input.trim().length === 0) {
      return [];
    }
    // TODO: add pagination
    const searchQueryLimit = limit ? Math.min(limit, 100) : 10;
    const url = `/api/stockdata/${input}?limit=${searchQueryLimit}`;
    const response = await StockApiService.fetchData<IStockData[]>(url);
    if (response) {
      return response;
    }
    return [];
  }

  public static async fetchCompanyProfiles(input: string): Promise<ICompanyProfile[]> {
    if (input.trim().length === 0) {
      return [];
    }
    const url = `/api/company-profile`;
    const response = await StockApiService.fetchData<ICompanyProfile[]>(url);
    if (response) {
      return response;
    }
    return [];
  }
}
