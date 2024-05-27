import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../components/Card';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: Object.fromEntries([...searchParams])['q'],
          page: page,
        },
      });

      setData((prevData) => [...prevData, ...response.data.results]);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData();
  }, [searchParams]);

  const handleScroll = () => {
    if (window.innerWidth + window.scrollY >= document.body.offsetHeight) {
      setPage((prevPageNo) => prevPageNo + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {data.map((searchData, index) => (
            <Card data={searchData} key={searchData.id + 'search'} media_type={searchData.media_type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
