import axios, { AxiosError, AxiosInstance } from 'axios';

export class BaseApiService {
  //----------------------------------------------------------------//
  //                           Properties
  //----------------------------------------------------------------//

  protected static readonly baseEndpoint = '/api';
  private static _apiService: AxiosInstance | null = null;
  public static get apiService(): AxiosInstance {
    if (BaseApiService._apiService == null) {
      BaseApiService._apiService = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    return BaseApiService._apiService;
  }

  //----------------------------------------------------------------//
  //                           Protected
  //----------------------------------------------------------------//

  protected static async fetchData<T>(url: string): Promise<T | null> {
    try {
      const response = await BaseApiService.apiService.get<T>(url);
      const data = response.data;
      if (typeof data === 'object' && data != null && 'Error Message' in data) {
        const error = data['Error Message'] as string;
        throw new Error(error);
      }
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response != null) {
        throw new Error(BaseApiService.getErrorMessage(error));
      } else {
        throw error;
      }
    }
  }

  protected static async postData<T>(url: string, data: unknown): Promise<T | null> {
    try {
      const response = await BaseApiService.apiService.post<T>(url, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response != null) {
        throw new Error(BaseApiService.getErrorMessage(error));
      } else {
        throw error;
      }
    }
  }

  protected static async deleteData<T>(url: string): Promise<T | null> {
    try {
      const response = await BaseApiService.apiService.delete<T>(url);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response != null) {
        throw new Error(BaseApiService.getErrorMessage(error));
      } else {
        throw error;
      }
    }
  }

  //----------------------------------------------------------------//
  //                           Private
  //----------------------------------------------------------------//

  private static getErrorMessage(error: AxiosError): string {
    return error.code + ': ' + error.message;
  }
}
