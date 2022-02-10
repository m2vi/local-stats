import { basicFetch } from '@utils/fetch';
import QueryString from 'qs';
import _ from 'underscore';

class Coingecko {
  private get baseUrl() {
    return 'https://api.coingecko.com/api/v3';
  }

  private async fetch(route: string, qs: any) {
    return await basicFetch(`${this.baseUrl}/${route}?${QueryString.stringify(qs)}`);
  }

  async currencies(ids: string[]) {
    try {
      const data = await this.fetch('coins/markets', {
        ids: ids.join(','),
        vs_currency: 'eur',
        sparkline: true,
        price_change_percentage: '7d',
      });

      return data;
    } catch (error: any) {
      console.log(error?.message);
      return [];
    }
  }

  async widget() {
    const currencies = await this.currencies(['bitcoin', 'ethereum', 'monero']);
    const currency = _.sample(currencies);

    return {
      service: 'coingecko',
      data: {
        icon: 'CashIcon',
        name: `${currency?.name}`,
        value: `${currency?.current_price}€`,
        diff: `${Math.round((currency?.price_change_percentage_24h + Number.EPSILON) * 100) / 100}%`,
      },
    };
  }
}

export const coingecko = new Coingecko();
export default coingecko;
