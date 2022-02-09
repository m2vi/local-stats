import { basicFetch } from '@utils/fetch';

class Scoresaber {
  get id() {
    return process.env.SCORESABER_ID!;
  }

  private async fetch(id: string) {
    return await basicFetch(`https://scoresaber.com/api/player/${id}/full`);
  }

  async get() {
    try {
      return await this.fetch(this.id);
    } catch (error: any) {
      return {
        error: error?.message,
      };
    }
  }

  async widget() {
    try {
      const data = await this.fetch(this.id);

      return {
        service: 'scoresaber',
        data: {
          icon: 'ChartBarIcon',
          name: 'Scoresaber rank',
          value: data?.rank,
          diff: parseInt(data?.histories?.split(',')?.reverse()?.slice(0, 7)?.reverse()[0]) - data?.rank,
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
