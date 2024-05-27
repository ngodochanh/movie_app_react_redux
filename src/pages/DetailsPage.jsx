import { useParams } from 'react-router-dom';
import useFetchDetails from '../hooks/useFetchDetails';
import useFetch from '../hooks/useFetch';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import Divider from '../components/Divider';
import HorizontalScrollCard from '../components/HorizontalScrollCard';

function DetailsPage() {
  const params = useParams();
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`);
  const { data: recommendationData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);
  const duration = (Number(data?.runtime) / 60).toFixed(1).split('.');
  const writer = castData?.crew
    ?.filter((el) => el?.job === 'Writer')
    .map((el) => el?.name)
    ?.join(', ');

  return (
    <div>
      <div className='w-full h-[280px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img src={imageUrl + data?.backdrop_path} className='h-full w-full object-cover' />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
          <img src={imageUrl + data?.poster_path} className='h-80 w-80 object-cover rounded' />
        </div>

        <div>
          <h2 className='text-2xl lg:text-4xl font-bold'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center gap-3'>
            <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>

            <Divider />

            <div className='flex items-center gap-3 my-3 text-center'>
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>Release Date: {moment(data?.release_date).format('MMMM Do YYYY')}</p>
              <span>|</span>
              <p>Revenue: {Number(data?.revenue)}</p>
            </div>

            <Divider />
          </div>

          <div>
            <p>
              <span className='text-white'>Director</span> : {castData?.crew[0]?.name}
            </p>

            <Divider />

            <p>
              <span className='text-white'>Writer : {writer}</span>
            </p>
          </div>

          <Divider />

          <h2>Cast:</h2>

          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((starCast, index) => {
                console.log(starCast);
                return (
                  <div key={castData.credit_id}>
                    <div>
                      <img src={imageUrl + starCast?.profile_path} className='w-24 h-24 object-cover rounded-full' />
                    </div>

                    <p className='font-bold text-center text-sm text-neutral-400'>{castData?.name}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className='container mx-auto px-3'>
        <HorizontalScrollCard data={similarData} heading={'Similar ' + params?.explore} media_type={params?.explore} />
        <HorizontalScrollCard
          data={recommendationData}
          heading={'Recommendation ' + params?.explore}
          media_type={params?.explore}
        />
      </div>
    </div>
  );
}

export default DetailsPage;
