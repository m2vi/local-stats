import backup from '@utils/backup/backup';
import { basicFetch } from '@utils/fetch';
import QueryString from 'qs';
import _ from 'underscore';
import api from '../main';

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

  async info() {
    if (api.useBackup) return backup.pihole.info;
    const [summary, versions] = await Promise.all([this.summary(), this.version()]);

    const version = versions?.core_current;
    const clients = summary?.clients_ever_seen;
    const unique_clients = summary?.unique_clients;

    const unique_domains = summary?.unique_domains;
    const cached = summary?.queries_cached;
    const blocked = summary?.domains_being_blocked;
    const forwarded = summary?.queries_forwarded;

    return {
      'IP-Address': this.ip,
      Version: version,
      Clients: clients,
      'Unique clients': unique_clients,
      'Privacy level': summary?.privacy_level,
      /*       stats: {
        blocked,
        cached,
        forwarded,
        unique_domains,
      }, */
    };
  }
}

export const pihole = new PiHole();
export default pihole;
