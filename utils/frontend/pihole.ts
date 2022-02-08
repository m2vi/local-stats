import backup from '@utils/backup/backup';
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
      return backup.pihole.info;
    }
  }

  async chart() {
    try {
      const data = await basicFetch('/api/pi-hole/chart');

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return backup.pihole.chart;
    }
  }

  async fetchInfo(setState: (value: SetStateAction<any>) => void, setStateLast: (value: SetStateAction<number>) => void) {
    setStateLast(Date.now());
    const info = await this.info();

    setState(info);
  }

  async fetchChart(setState: (value: SetStateAction<any>) => void, setStateLast: (value: SetStateAction<number>) => void) {
    setStateLast(Date.now());
    const chart = await this.chart();

    setState(chart);
    //setState(chart);
  }
}

export const pihole = new PiHole();
export default pihole;
