import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

function ExplorePage() {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPageNo, setTotalPageNo] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });

      setData((prevData) => [...prevData, ...response.data.results]);
      setTotalPageNo(response.data.total_pages);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleScroll = () => {
    if (window.innerWidth + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prevPageNo) => prevPageNo + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className='pt-16'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Popular {params.explore} show</h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-4'>
          {data.map((exploreData, index) => (
            <Card data={exploreData} key={exploreData.id + 'exploreSection'} media_type={params.explore} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExplorePage;
