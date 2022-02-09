import Full from '@components/Full';
import PiHole from './PiHole';
import Printer from './Printer';
import Widgets from './Widgets';

const Home = () => {
  return (
    <Full className='flex flex-col items-center justify-center'>
      <Widgets />
      <PiHole />
      <Printer />
    </Full>
  );
};

export default Home;
