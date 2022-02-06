import cheerio from 'cheerio';

// file deepcode ignore UseArrowFunction: <please specify a reason of ignoring this>
class PrinterInfo {
  scrap(html: string) {
    const $ = cheerio.load(html);

    const firstRow: any[] = [];
    const secondRow: any[] = [];

    //FIXME: bad method
    $('.contentsGroup:nth-child(4) dl.items dt:not(.subhead)').each(function (this, i) {
      firstRow.push({ name: $(this).text() });
    });
    $('.contentsGroup:nth-child(4) dl.items dd').each(function (this, i) {
      secondRow.push({ value: $(this).text() });
    });

    const array = firstRow.map((value, i) => {
      return {
        name: value?.name,
        value: secondRow?.[i]?.value.replace(/\s/g, ''),
      };
    });

    return [{ name: 'Device Name', value: $('head title').text() }, ...array];
  }

  info(html: string) {
    const scrapped = this.scrap(html);

    let obj: any = {};

    scrapped.forEach(({ name, value }) => {
      obj[name] = value;
    });

    return obj;
  }
}

export const printerInfo = new PrinterInfo();
export default printerInfo;
