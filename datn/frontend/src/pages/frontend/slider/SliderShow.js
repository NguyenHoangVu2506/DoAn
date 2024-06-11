
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
    <section className="pt-3">
      <div className="container">
        <div className="row gx-3">
          <main className="col-lg-9 ">
            <Carousel autoplay class="card-banner p-4 bg-primary ">
              {allSlider && allSlider.map((slider,index) => (
                <Link to={slider.slider_link} key={index} >
                  <img  src={slider.slider_image} alt={slider.slider_link} style={{ width: '100%', height: 'auto' }} />
                </Link>
              ))}
            </Carousel>
          </main>
          <aside className="col-lg-3">
            <div className="card-banners h-100 " >
              <div className="card-body pb-2">
                <img src='https://www.guardian.com.vn/media/.renditions/wysiwyg/banner/z5064554484589_f706d7d32beeba7491f1add7f8e5c6ec.jpg' style={{ width: '100%', height: '126px' }}/>
              </div>
              <div className="card-body pb-4">
                <img src='https://www.guardian.com.vn/media/.renditions/wysiwyg/banner/z5064554484589_f706d7d32beeba7491f1add7f8e5c6ec.jpg' style={{ width: '100%', height: '126px' }}/>
              </div>
            </div>
            
          </aside>
        </div>
      </div>
    </section>
  );
}
