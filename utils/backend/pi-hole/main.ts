import { basicFetch } from '@utils/fetch';
import QueryString from 'qs';
import _ from 'underscore';

class PiHole {
  get password() {
    return process.env.PI_HOLE_PASSWORD;
  }

  get auth() {
    return _.omit({ auth: this.password }, (i) => !i);
  }

  get ip() {
    return process.env.PI_HOLE_IP;
  }

  get baseUrl() {
    return `http://${this.ip}`;
  }

  async afetch(route: string, qs_obj: any = {}) {
    return await basicFetch(`${this.baseUrl}/${route}?${QueryString.stringify({ ...qs_obj, ...this.auth })}`);
  }

  async cacheInfo() {
    const data = await this.afetch('admin/api.php', { getCacheInfo: '' });

    return data?.cacheinfo;
  }

  async status() {
    const data = await this.afetch('admin/api_db.php', { status: '' });

    return data;
  }

  async summary() {
    const data = await this.afetch('admin/api.php', { summary: '' });

    return data;
  }

  async top() {
    const data = await this.afetch('admin/api.php', { topItems: '', getQuerySources: '', topClientsBlocked: '' });

    return data;
  }

  async version() {
    const data = await this.afetch('admin/api.php', { versions: '' });

    return data;
  }

  async dbFilesize() {
    const data = await this.afetch('admin/api_db.php', { getDBfilesize: '' });

    return data;
  }
}

export const pihole = new PiHole();
export default pihole;
