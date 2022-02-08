import printerJson from '@data/printer.bak.json';
import piholeJson from '@data/pi-hole.bak.json';

class Printer {
  get info() {
    return printerJson.info;
  }

  get stats() {
    return printerJson.stats;
  }

  get get() {
    return printerJson;
  }
}

class PiHole {
  get info() {
    return piholeJson.info;
  }
}

class Backup {
  printer: Printer;
  pihole: PiHole;
  constructor() {
    this.printer = new Printer();
    this.pihole = new PiHole();
  }
}

export const backup = new Backup();
export default backup;
