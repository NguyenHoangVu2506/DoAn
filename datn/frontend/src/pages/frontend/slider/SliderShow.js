
import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getListSlider } from '../../../store/actions/slider-actions';
import { Link } from 'react-router-dom';

export default function Slider() {
  // const sliders = [
  //   // {
  //   //   id: 1,
  //   //   name: 'slider01',
  //   //   to: '#',
  //   //   imageSrc: 'https://www.guardian.com.vn/media/wysiwyg/Web_Slider_Banner_1410_x_440.png',
  //   //   imageAlt: '',
  //   // }
  
  // ];
  const dispatch = useDispatch();
  const { allSlider } = useSelector((state) => state.sliderReducer);

  useEffect(() => {
    if (!allSlider) {
      dispatch(getListSlider({slider_is_active : true, slider_position : "banner"} ));
    }
    console.log(allSlider);
  }, [allSlider]);
  

  return (
    <section className="">
      <div className="">
        <div className="row gx-3">
          <main className="col-lg-12 ">
            <Carousel autoplay class="card-banner p-4 bg-primary ">
              {allSlider && allSlider.map((slider,index) => (
                <Link to={slider.slider_link} key={index} >
                  <img  src={slider.slider_image} alt={slider.slider_link} style={{ width: '100%', height: 'auto' }} />
                </Link>
              ))}
            </Carousel>
          </main>
          
        </div>
      </div>
    </section>
  );
}
