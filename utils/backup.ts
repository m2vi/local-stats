import json from '@data/preview.json';

class Backup {
  get info() {
    return json.info;
  }

  get stats() {
    return json.stats;
  }

  get get() {
    return json;
  }
}

export const backup = new Backup();
export default backup;
