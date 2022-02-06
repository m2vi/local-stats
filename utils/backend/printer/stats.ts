import cheerio from 'cheerio';

// file deepcode ignore UseArrowFunction: <please specify a reason of ignoring this>
class PrinterStats {
  // FIXME: Bad code
  scrap(html: string) {
    const $ = cheerio.load(html);

    const secondRow: any[] = [];
    const thirdRow: any[] = [];

    $('.contentsGroup:not(.links) tbody tr').each(function (this, i) {
      if (i === 1) {
        $(this)
          .find('td')
          .each(function (this, i) {
            const colorName = $(this).find('img').attr('alt');
            const height = $(this).find('img').attr('height');

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

  stats(html: string) {
    const scrapped = this.scrap(html);

    return scrapped?.map(({ ...props }) => {
      return {
        ...props,
        percentage: Math.floor((props.height / 52) * 100), // FIXME: (Strange height lol)
      };
    });
  }
}

export const printerStats = new PrinterStats();
export default printerStats;
