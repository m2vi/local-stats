import { basicFetch } from '@utils/fetch';
import { SetStateAction } from 'react';

class PiHole {
  async info() {
    try {
      const data = await basicFetch('/api/pi-hole/info');

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  async fetchInfo(setState: (value: SetStateAction<any>) => void, setStateLast: (value: SetStateAction<number>) => void) {
    setStateLast(Date.now());
    const info = await this.info();

    if (Object.entries(info).length > 0) setState(info);
  }
}

export const pihole = new PiHole();
export default pihole;
