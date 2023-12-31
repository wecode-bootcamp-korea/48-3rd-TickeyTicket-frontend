import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper/modules';

const MainBanner = () => {
  const [bannerData, setBannerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/data/mainBanner.json').then(response => {
      setBannerData(response.data);
    });
  }, []);

  return (
    <Swiper
      className="mySwiper w-full h-full"
      spaceBetween={30}
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      centeredSlides
      loop
      style={{
        '--swiper-pagination-bullet-width': '2.5rem',
        '--swiper-pagination-bullet-horizontal-gap': '6px',
        '--swiper-pagination-bullet-border-radius': '10px',
        '--swiper-pagination-bullet-inactive-color': '#fff',
        '--swiper-pagination-bullet-inactive-opacity': '0.5',
        '--swiper-pagination-color': '#ff097f',
        '--swiper-pagination-bullet-opacity': '0.7',
        '--swiper-pagination-cursor': 'pointer',
      }}
    >
      {bannerData.map(data => (
        <SwiperSlide
          key={data.id}
          onClick={() =>
            data.genreId
              ? navigate(`/sub/?genreId=${data.genreId}`)
              : navigate('/sub')
          }
        >
          <div
            className="bannerImage shrink-0 relative h-full w-full rounded-2xl shadow-xl cursor-pointer bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${data.url})` }}
          >
            <div className="textContainer absolute bottom-0 text-white font-bold pb-20 pl-12 pr-12 items-end">
              <div className="bannerText mb-2">{data.text}</div>
              <div className="bannerTitle text-4xl font-extrabold">
                {data.title[0]}
              </div>
              <div className="bannerTitle text-4xl font-extrabold">
                {data.title[1]} →
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default MainBanner;
