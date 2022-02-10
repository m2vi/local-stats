import * as Icons from '@heroicons/react/outline';
import backup from '@utils/backup/backup';
import widget from '@utils/frontend/widget';
import { useEffect, useState } from 'react';

const Widgets = () => {
  const [widgets, setWidgets] = useState<any[]>(Array.from({ length: 4 }).map(() => backup.widgets.get));

  useEffect(() => {
    widget.fetch(setWidgets);
    const interval = setInterval(() => widget.fetch(setWidgets), 1000 * 5);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='grid grid-cols-4 gap-4 max-w-screen-lg w-full mb-6'>
      {widgets.map((v, i) => {
        const isNegative = Math.sign(parseFloat(v?.data?.diff)) === -1;

        const Icon = (Icons as any)?.[v?.data?.icon] ? (Icons as any)?.[v?.data?.icon] : Icons['MinusSmIcon'];

        return (
          <div className='p-4 bg-primary-800 rounded-15 flex items-center hover:opacity-80 cursor-pointer' key={i}>
            <div className='h-8 w-8 mr-4 rounded bg-accent grid place-items-center'>
              <Icon className='h-4 w-4' />
            </div>
            <div className='flex flex-col justify-center'>
              <span className='text-primary-300 leading-4 mb-1 text-sm'>{v?.data?.name}</span>
              <span className='text-primary-100 leading-4 text-lg'>
                {`${v?.data?.value} `}
                {v?.data?.diff !== null && (
                  <span className={`text-base ${isNegative ? 'text-red-500' : 'text-green-500'}`}>{`${isNegative ? '' : '+'}${
                    v?.data?.diff
                  }`}</span>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Widgets;
