import axios, { AxiosError, AxiosInstance } from 'axios';

// base class
export class ApiService {
  //----------------------------------------------------------------//
  //                           Properties
  //----------------------------------------------------------------//

  protected static baseEndpoint = '/api';
  private static _apiService: AxiosInstance | null = null;
  public static get apiService(): AxiosInstance {
    if (ApiService._apiService == null) {
      ApiService._apiService = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    return ApiService._apiService;
  }

  //----------------------------------------------------------------//
  //                           Private
  //----------------------------------------------------------------//

  protected static async fetchData<T>(url: string): Promise<T | null> {
    try {
      const response = await ApiService.apiService.get<T>(url);
      return response.data;
      // TODO: handle status code error
    } catch (error) {
      if (error instanceof AxiosError && error.response != null) {
        console.error('Error fetching data:', error.response.data);
        alert(JSON.stringify(error.response.data));
      }
    }
    return null;
  }

  protected static async postData<T>(url: string, data: any): Promise<T | null> {
    try {
      const response = await ApiService.apiService.post<T>(url, data);
      return response.data;
      // TODO: handle status code error
    } catch (error) {
      if (error instanceof AxiosError && error.response != null) {
        console.error('Error posting data:', error.response.data);
        alert(JSON.stringify(error.response.data));
      }
    }
    return null;
  }

  protected static async putData<T>(url: string, data: any): Promise<T | null> {
    try {
      const response = await ApiService.apiService.put<T>(url, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response != null) {
        console.error('Error putting data:', error.response.data);
        alert(JSON.stringify(error.response.data));
      }
    }
    return null;
  }

  protected static async deleteData<T>(url: string): Promise<T | null> {
    try {
      const response = await ApiService.apiService.delete<T>(url);
      return response.data;
      // TODO: handle status code error
    } catch (error) {
      if (error instanceof AxiosError && error.response != null) {
        console.error('Error deleting data:', error.response.data);
        alert(JSON.stringify(error.response.data));
      }
    }
    return null;
  }
}
