import printerJson from '@data/printer.bak.json';
import piholeJson from '@data/pi-hole.bak.json';
import widgetsJson from '@data/widgets.bak.json';

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

  get chart() {
    return piholeJson.chart;
  }
}

class Widgets {
  get get() {
    return widgetsJson;
  }
}

class Backup {
  printer: Printer;
  pihole: PiHole;
  widgets: Widgets;
  constructor() {
    this.printer = new Printer();
    this.pihole = new PiHole();
    this.widgets = new Widgets();
  }
}

export const backup = new Backup();
export default backup;
