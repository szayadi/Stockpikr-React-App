import { useAsyncError } from '../components/GlobalErrorBoundary';
import { IUserInfo } from '../interfaces/IUser';
import { BaseApiService } from './ApiService';

export class UserApiService extends BaseApiService {
  protected static endpoint = `${this.baseEndpoint}/users`;
  //----------------------------------------------------------------//
  //                           Public
  //----------------------------------------------------------------//

  public static async fetchUserDetails(): Promise<IUserInfo | null> {
    const response = await super.fetchData<IUserInfo>(`${this.endpoint}/temp`);
    return response;
  }
  
  public static async logout(): Promise<void> {
    const throwError = useAsyncError();
    try {
      await fetch(`${this.endpoint}/logout`, {
        method: 'GET',
        credentials: 'include'
      });
    } catch (error) {
      throwError(error);
    }
  }
}