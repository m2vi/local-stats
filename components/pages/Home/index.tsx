import Full from '@components/Full';
import PiHole from './PiHole';
import Printer from './Printer';
import Widgets from './Widgets';
import Crypto from './Crypto';

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <Widgets />
      <PiHole />
      <Printer />
      <Crypto />
    </div>
  );
};

export default Home;
