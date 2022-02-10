import { basicFetch } from '@utils/fetch';
import { SetStateAction } from 'react';

class Scoresaber {
  async fetch(setState: (value: SetStateAction<any>) => void) {
    const widgets = await Promise.all([basicFetch('/api/scoresaber/widget'), basicFetch('/api/filmlist/widget')]);
    console.log(widgets);
    setState(widgets);
  }

  async fetchCoingecko(setState: (value: SetStateAction<any>) => void) {
    const data = await basicFetch('/api/coingecko/widgets');
    console.log(data);
    if (data?.error) return;
    setState(data);
  }
}

export const scoresaber = new Scoresaber();
export default scoresaber;
