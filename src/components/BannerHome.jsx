import { useSelector } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

function BannerHome() {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const [currentImage, setCurrentImage] = useState(2);

  const handlePrevious = () => {
    if (currentImage > 0) {
      setCurrentImage((PrevCurrentImage) => PrevCurrentImage - 1);
    }
  };

  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((PrevCurrentImage) => PrevCurrentImage + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData, imageUrl]);

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
        {bannerData.map((data, index) => (
          <div
            className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all'
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            <div className='w-full h-full'>
              <img src={imageUrl + data.backdrop_path} alt='logo' className='h-full w-full object-cover' />
            </div>

            {/* button next and previous image */}
            <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex'>
              <button className='bg-white p-1 rounded-full text-xl z-10 text-black' onClick={handlePrevious}>
                <FaAngleLeft />
              </button>
              <button className='bg-white p-1 rounded-full text-xl z-10 text-black' onClick={handleNext}>
                <FaAngleRight />
              </button>
            </div>

            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
            <div className='container mx-auto'>
              <div className='w-full absolute bottom-0 max-w-md px-3'>
                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                  {data?.title || data?.name}
                </h2>
                <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                <div className='flex items-center gap-4'>
                  <p>Rating: {Number(data.vote_average).toFixed(1)} +</p>
                  <span>|</span>
                  <p>View: {Number(data.popularity).toFixed(0)}</p>
                </div>

                <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all'>
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BannerHome;
