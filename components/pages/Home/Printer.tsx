import printer from '@utils/frontend/printer';
import { PrinterInkLevelProps } from '@utils/types';
import { useState } from 'react';
import { useEffect } from 'react';
import { Line } from 'rc-progress';
import moment from 'moment';
import Full from '@components/Full';

const Printer = () => {
  const [fillLevel, setFillLevel] = useState<PrinterInkLevelProps[]>([]);
  const [fillLevelLast, setFillLevelLast] = useState(0);
  const [info, setInfo] = useState<any>({});
  const [infoLast, setInfoLast] = useState(0);

  const fetchFillLevel = async () => {
    printer
      .fillLevel()
      .then((data) => {
        if (data?.length > 0) {
          setFillLevel(data);
          setFillLevelLast(Date.now());
        }
      })
      .catch((reason) => console.log(reason));
  };

  const fetchInfo = async () => {
    printer
      .info()
      .then((data) => {
        setInfo(data);
        setInfoLast(Date.now());
      })
      .catch((reason) => console.log(reason));
  };

  useEffect(() => {
    fetchInfo();
    const interval = setInterval(() => fetchInfo(), 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchFillLevel();
    const interval = setInterval(() => fetchFillLevel(), 1000 * 5);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex justify-between  max-w-screen-lg w-full h-full max-h-250 mb-6'>
      <div className='w-full rounded-15 bg-primary-800 flex flex-col p-6 shadow-1 mr-6 h-full relative'>
        <span className='text-xl font-semibold'>Printer fill level:</span>

        <table className='my-3'>
          <tbody>
            {fillLevel?.map(({ key, name, percentage }: PrinterInkLevelProps) => {
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
          </tbody>
        </table>
        <span className='text-primary-300 text-sm absolute bottom-6'>Last fetch {moment(fillLevelLast).format('HH:mm:ss')}</span>
      </div>
      <div className='w-full rounded-15 bg-primary-800 flex flex-col p-6 shadow-1 max-w-sm h-full relative'>
        <span className='text-xl font-semibold'>Printer info:</span>
        <table className='my-3'>
          <tbody>
            {Object.entries(info).map(([name, value]: any) => {
              return (
                <tr key={name}>
                  <td>
                    <span className='w-full mr-2 whitespace-nowrap text-button'>{name}:</span>
                  </td>
                  <td>
                    <span className='w-full mr-2 whitespace-nowrap text-button'>{value}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <span className='text-primary-300 text-sm  absolute bottom-6'>Last fetch {moment(infoLast).format('HH:mm:ss')}</span>
      </div>
    </div>
  );
};

export default Printer;
