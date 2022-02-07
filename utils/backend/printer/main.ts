import backup from '@utils/backup';
import { PrinterInkLevelProps } from '@utils/types';
import puppeteer, { Puppeteer } from 'puppeteer';
import printerInfo from './info';
import printerStats from './stats';

class Printer {
  get ip() {
    return process.env.PRINTER_IP;
  }

  get password() {
    return process.env.PRINTER_PASSWORD;
  }

  get url() {
    return `http://${this.ip}`;
  }

  private async login() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(`${this.url}/general/index.html`);

    if ((await page.$('input#login')) === null) return { browser, page };

    await page.type('input#LogBox', this.password!);
    await page.click('input#login');

    await page.waitForNavigation();

    return { browser, page };
  }

  private async statsG(page: puppeteer.Page): Promise<PrinterInkLevelProps[]> {
    await page.goto(`${this.url}/general/status.html`);
    const content = await page.content();

    return printerStats.stats(content);
  }

  private async infoG(page: puppeteer.Page): Promise<any> {
    await page.goto(`${this.url}/admin/firmwareupdate.html`);
    const content = await page.content();

    return { ...{ 'IP-Address': this.ip }, ...printerInfo.info(content) };
  }

  async stats() {
    // return backup.stats;
    try {
      const content = await (await fetch(`${this.url}/general/status.html`)).text();

      return printerStats.stats(content);
    } catch (error) {
      return [];
    }
  }

  async info() {
    //  return backup.info;
    try {
      const { browser, page } = await this.login();

      const info = await this.infoG(page);

      await browser.close();

      return info;
    } catch (error) {
      return {};
    }
  }

  async get() {
    // return backup.get;
    try {
      const { browser, page } = await this.login();

      const stats = await this.statsG(page);
      const info = await this.infoG(page);

      await browser.close();

      return { info, stats };
    } catch (error) {
      return { info: {}, stats: [] };
    }
  }
}

export const printer = new Printer();
export default printer;
