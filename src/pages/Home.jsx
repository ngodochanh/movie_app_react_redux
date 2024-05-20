import { useSelector } from 'react-redux';
import BannerHome from '../components/BannerHome';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import useFetch from '../hooks/useFetch';

function Home() {
  const trendingData = useSelector((state) => state.movieData.bannerData);
  const { data: nowPlayingData } = useFetch('/movie/now_playing');
  const { data: topRatedData } = useFetch('/tv/top_rated');
  const { data: popularTvShowData } = useFetch('/tv/popular');
  const { data: onTheAirShowData } = useFetch('/tv/on_the_air');

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading='Trending' trending={true} />
      <HorizontalScrollCard data={nowPlayingData} heading='Now Playing' />
      <HorizontalScrollCard data={topRatedData} heading='Top Rated Movies' />
      <HorizontalScrollCard data={popularTvShowData} heading='Popular TV Show' />
      <HorizontalScrollCard data={onTheAirShowData} heading='On The Air' />
    </div>
  );
}

export default Home;
