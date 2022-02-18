import backup from '@utils/backup/backup';
import { basicFetch } from '@utils/fetch';
import { ChartData } from 'chart.js';
import cheerio from 'cheerio';
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

  async raspStatus() {
    const data = await (await fetch(`${this.baseUrl}/admin/groups-domains.php`)).text();

    const $ = cheerio.load(data);

    const rawInfo = $('div.pull-left.info span:not([hidden]):not(#tempdisplay)')
      .map(function (this, i) {
        if (i >= 2) {
          return $(this)
            .text()
            .split(':')
            .map((s) => s.trim());
        }
      })
      .get();

    const info = {
      [rawInfo[0]]: rawInfo[1],
      [rawInfo[2]]: `${parseFloat(rawInfo[3]).toFixed(1)}°C`,
    };

    return info;
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

  async chart(): Promise<ChartData<'doughnut', number[], string>> {
    const { dns_queries_today, ads_blocked_today } = await this.summary();

    return {
      labels: ['permitted', 'blocked'],
      datasets: [
        {
          label: 'All queries',
          data: [dns_queries_today - ads_blocked_today, ads_blocked_today],
          backgroundColor: ['#44A9FD', '#a22b1c'],
        },
      ],
    };
  }
}

export const pihole = new PiHole();
export default pihole;
