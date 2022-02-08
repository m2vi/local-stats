import Full from '@components/Full';
import PiHole from './PiHole';
import Printer from './Printer';

const Home = () => {
  return (
    <Full className='flex flex-col items-center justify-center'>
      <PiHole />
      <Printer />
    </Full>
  );
};

export default Home;
