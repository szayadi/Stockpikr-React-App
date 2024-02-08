import { IUserInfo } from '../interfaces/IUser';
import { ApiService } from './ApiService';

export class UserApiService extends ApiService {
  protected static endpoint = `${this.baseEndpoint}/users`;
  //----------------------------------------------------------------//
  //                           Public
  //----------------------------------------------------------------//

  public static async fetchUserDetails(): Promise<IUserInfo | null> {
    const response = await super.fetchData<IUserInfo>(`${this.endpoint}/temp`);
    console.log({ response });
    return response;
  }
}
