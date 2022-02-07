import QueryString from 'qs';
import _ from 'underscore';

class PiHole {
  get password() {
    return process.env.PI_HOLE_PASSWORD;
  }

  get authqs() {
    return QueryString.stringify(_.omit({ auth: this.password }, (i) => !i));
  }
}

export const pihole = new PiHole();
export default pihole;
