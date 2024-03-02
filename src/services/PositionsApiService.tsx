import { userID } from '../helper/constants';
import { PatchResult } from '../interfaces/IMongo';
import { IPositionsModel, MinimalPositionsTicker } from '../interfaces/IPositionsModel';
import { BaseApiService } from './ApiService';

export class PositionsApiService extends BaseApiService {
    private static getEndpoint() {
        return `${this.baseEndpoint}/positions`;
    }

    private static addUserIdToEndpoint(endpoint: string) {
        return `${endpoint}?userId=${userID}`;
    }

    public static async fetchPurchasedStocksByUserId(): Promise<IPositionsModel[]> {
        const response = await super.fetchData<IPositionsModel[]>(
            this.addUserIdToEndpoint(`${this.getEndpoint()}`)
        );
        console.log(response)
        if (response) {
            return response;
        }
        return [];
    }

    public static async addStockToPurchasedStocks(
        ticker: MinimalPositionsTicker
    ): Promise<string | null> {
        try {
            const response = await super.postData<string>(this.addUserIdToEndpoint(`${this.getEndpoint()}`), ticker);
            return response;
        } catch (error) {
            console.error('Error adding stock to purchased stocks:', error);
            return null;
        }
    }

    public static async deleteStocksInWatchlist(
        tickerSymbols: string[]
    ): Promise<PatchResult | null> {
        console.log(tickerSymbols)
        const response = await super.patchData<PatchResult>(
            this.addUserIdToEndpoint(`${this.getEndpoint()}`),
            tickerSymbols
        );
        return response;
    }

}
