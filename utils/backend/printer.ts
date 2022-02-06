import cheerio from 'cheerio';

// file deepcode ignore UseArrowFunction: <please specify a reason of ignoring this>
class Printer {
  private async html() {
    const text = await (await fetch(`http://${this.ip}/general/status.html`)).text();

    return text;
  }

  private async scrap() {
    const html = await this.html();
    const $ = cheerio.load(html);

    const secondRow: any[] = [];
    const thirdRow: any[] = [];

    $('.contentsGroup:not(.links) tbody tr').each(function (this, i) {
      if (i === 1) {
        $(this)
          .find('td')
          .each(function (this, i) {
            const colorName = $(this).find('img').attr('alt');
            const height = $(this).find('img').attr('height'); //! FIX (Strange height lol)

            secondRow.push(Object.freeze({ colorName, height }));
          });
      } else if (i === 2) {
        $(this)
          .find('th')
          .each(function (this, i) {
            const key = $(this).text();

            thirdRow.push(Object.freeze({ key }));
          });
      }
    });

    return secondRow.map((value, i) => {
      const key = thirdRow?.[i]?.key;
      const name = value?.colorName;
      const height = value?.height;

      return { key, name, height };
    });
  }

  get ip() {
    return process.env.PRINTER_IP;
  }

  async stats() {
    const scrapped = await this.scrap();

    return scrapped?.map(({ ...props }) => {
      return {
        ...props,
        percentage: Math.floor((props.height / 52) * 100),
      };
    });
  }
}

export const printer = new Printer();
export default printer;
