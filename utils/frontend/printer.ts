import { basicFetch } from '@utils/fetch';

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
}

export const printer = new Printer();
export default printer;
