import { useSelector } from 'react-redux';
import BannerHome from '../components/BannerHome';
import HorizontalScrollCard from '../components/HorizontalScrollCard';

function Home() {
  const trendingData = useSelector((state) => state.movieData.bannerData);

  return (
    <div>
      <BannerHome />

      <HorizontalScrollCard data={trendingData} heading='Trending' />
    </div>
  );
}

export default Home;
