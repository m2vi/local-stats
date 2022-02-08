import { basicFetch } from '@utils/fetch';
import { PrinterInkLevelProps } from '@utils/types';
import { SetStateAction } from 'react';

class Printer {
  async stats() {
    try {
      const data = await basicFetch('/api/printer');

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async fillLevel() {
    try {
      const data = await basicFetch('/api/printer/fill-level');

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async info() {
    try {
      const data = await basicFetch('/api/printer/info');

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  async fetchFillLevel(
    setState: (value: SetStateAction<Array<PrinterInkLevelProps>>) => void,
    setStateLast: (value: SetStateAction<number>) => void
  ) {
    setStateLast(Date.now());
    const fillLevel = await this.fillLevel();

    if (fillLevel?.length > 0) setState(fillLevel);
  }

  async fetchInfo(setState: (value: SetStateAction<any>) => void, setStateLast: (value: SetStateAction<number>) => void) {
    setStateLast(Date.now());
    const info = await this.info();

    if (Object.entries(info).length > 0) setState(info);
  }
}

export const printer = new Printer();
export default printer;
