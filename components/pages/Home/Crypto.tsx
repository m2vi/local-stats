import backup from '@utils/backup/backup';
import widget from '@utils/frontend/widget';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/outline';

const Widgets = () => {
  const [widgets, setWidgets] = useState<any[]>(Array.from({ length: 4 }).map(() => backup.widgets.get));

  useEffect(() => {
    widget.fetchCoingecko(setWidgets);
    const interval = setInterval(() => widget.fetchCoingecko(setWidgets), 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='grid grid-cols-4 gap-4 max-w-screen-lg w-full mb-6'>
      {widgets.map((v, i) => {
        const isNegative = Math.sign(parseFloat(v?.price_change_percentage_7d_in_currency)) === -1;

        return (
          <a
            href={`https://coinmarketcap.com/currencies/${v?.name?.toLowerCase()}`}
            target='_blank'
            rel='noopener noreferrer'
            className='p-4 bg-primary-800 rounded-15 flex items-center hover:opacity-80 cursor-pointer'
            key={i}
          >
            <div className='h-8 w-8 mr-4 rounded bg-primary-700 grid place-items-center aspect-square'>
              {v?.image && <Image src={v?.image} height={40} width={40} alt=' ' />}
            </div>
            <div className='flex flex-col justify-center'>
              <span className='text-primary-300 leading-4 mb-1 text-sm'>{v?.name ? v?.name : '...'}</span>
              <span className='text-primary-100 leading-4 text-lg flex flex-col'>
                {v?.current_price ? `${v?.current_price}€` : '0€'}
                <span className={`leading-5 text-sm flex items-center ${isNegative ? 'text-red-500' : 'text-green-500'}`}>
                  {isNegative ? (
                    <TrendingDownIcon className='aspect-square' width={14} />
                  ) : (
                    <TrendingUpIcon className=' aspect-square' width={14} />
                  )}
                  <span style={{ marginLeft: '3px' }}>
                    {Math.round(
                      (v?.price_change_percentage_7d_in_currency ? v?.price_change_percentage_7d_in_currency : 0 + Number.EPSILON) * 100
                    ) / 100}
                    %
                  </span>
                </span>
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Widgets;
