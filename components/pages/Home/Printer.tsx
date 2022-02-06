import printer from '@utils/frontend/printer';
import { PrinterEntryProps } from '@utils/types';
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'rc-progress';
import moment from 'moment';

const Printer = () => {
  const [data, setData] = useState<PrinterEntryProps[]>([]);
  const [last, setLast] = useState(0);

  const fetchData = async () => {
    printer
      .stats()
      .then((data) => {
        if (data.length > 0) {
          setData(data);
          setLast(Date.now());
        }
      })
      .catch((reason) => console.log(reason));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full max-w-xl rounded-15 bg-primary-800 flex flex-col p-6 shadow-1'>
      <span className='text-xl font-semibold'>Printer fill level:</span>

      <table className='my-3'>
        {data?.map(({ key, name, percentage }) => {
          return (
            <tr key={key}>
              <td>
                <span className='w-full mr-2 whitespace-nowrap text-button'>{name}</span>
              </td>

              <td>
                <Line
                  percent={percentage}
                  className='w-full'
                  style={{ height: '8px', borderRadius: '100px' }}
                  strokeLinecap='round'
                  strokeColor={name}
                  trailColor={'#3a3a5f'}
                  strokeWidth={1.33333}
                />
              </td>
              <td>
                <span className='ml-2 w-8 opacity-80'>{`${percentage}%`}</span>
              </td>
            </tr>
          );
        })}
      </table>
      <span className='text-primary-300 text-sm'>Last fetch {moment(last).format('HH:mm:ss')}</span>
    </div>
  );
};

export default Printer;
