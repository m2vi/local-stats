import { basicFetch } from '@utils/fetch';

class Scoresaber {
  get id() {
    return process.env.SCORESABER_ID!;
  }

  private async fetch() {
    return await basicFetch(`https://filmlist.m2vi.me/api/stats/widget`);
  }

  async widget() {
    try {
      const data = await this.fetch();

      return {
        service: 'filmlist',
        data: {
          icon: 'FilmIcon',
          name: 'Watchlist',
          value: data?.['my list'],
          diff: null,
        },
      };
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }
}

export const scoresaber = new Scoresaber();
export default scoresaber;
