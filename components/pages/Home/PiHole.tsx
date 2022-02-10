import pihole from '@utils/frontend/pihole';
import { useState } from 'react';
import { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import moment from 'moment';
import { Chart, ArcElement } from 'chart.js';
import backup from '@utils/backup/backup';

Chart.register(ArcElement);

const PiHole = () => {
  const [info, setInfo] = useState<any>(backup.pihole.info);
  const [infoLast, setInfoLast] = useState<number>(0);
  const [chart, setChart] = useState(backup.pihole.chart);
  const [chartLast, setChartLast] = useState<number>(0);

  useEffect(() => {
    pihole.fetchInfo(setInfo, setInfoLast);
    const interval = setInterval(() => pihole.fetchInfo(setInfo, setInfoLast), 1000 * 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    pihole.fetchChart(setChart, setChartLast);
    const interval = setInterval(() => pihole.fetchChart(setChart, setChartLast), 1000 * 5);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex justify-between  max-w-screen-lg w-full h-300 mb-6'>
      <div className='w-full rounded-15 bg-primary-800 flex flex-col p-6 shadow-1 mr-6  h-300 relative'>
        <span className='text-xl font-semibold'>Pi-hole stats:</span>

        <span className='text-primary-300 text-sm absolute bottom-6'>Last fetch {moment(chartLast).format('HH:mm:ss')}</span>
      </div>
      <div className='w-full rounded-15 bg-primary-800 flex flex-col p-6 shadow-1 max-w-sm h-300 relative'>
        <span className='text-xl font-semibold'>Pi-hole info:</span>

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

export default PiHole;
