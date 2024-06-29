import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CWidgetStatsD, CRow, CCol, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCalendarCheck, cibCmake, cibDiscourse, cilCalendar } from '@coreui/icons';
import { CChart } from '@coreui/react-chartjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { onAllProduct } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecial } from '../../store/actions/special-actions';
import { getDiscount } from '../../store/actions/discount-actions';

const WidgetsBrand = ({ order, alluser, className, withCharts }) => {
  const dispatch = useDispatch();
  const [timeFrame, setTimeFrame] = useState('Ngày');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date());
  const { allProducts } = useSelector((state) => state.productReducer);
  const { special } = useSelector((state) => state.specialReducer);
  const { discount } = useSelector((state) => state.discountReducer);

  useEffect(() => {
    if (!discount) {
      dispatch(getDiscount({ sort: 'ctime' }));
    }
  }, [dispatch, discount]);

  useEffect(() => {
    if (!special) {
      dispatch(getSpecial({ sort: 'ctime' }));
    }
  }, [dispatch, special]);

  useEffect(() => {
    if (!allProducts) {
      dispatch(onAllProduct({ sort: 'ctime' }));
    }
  }, [dispatch, allProducts]);
console.log(allProducts)
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const filterDataByTimeFrame = (products, timeFrame, selectedDate) => {
    if (!products) return { labels: [], data: [] };
    const filteredProducts = products.filter(product => {
      const productDate = new Date(product.createdAt);
      if (timeFrame === 'Ngày') {
        return productDate.toDateString() === selectedDate.toDateString();
      } else if (timeFrame === 'Tháng') {
        return productDate.getMonth() === selectedDate.getMonth() && productDate.getFullYear() === selectedDate.getFullYear();
      } else if (timeFrame === 'Năm') {
        return productDate.getFullYear() === selectedDate.getFullYear();
      }
      return false;
    });

    const labels = [];
    const data = [];

    if (timeFrame === 'Ngày') {
      labels.push(selectedDate.toDateString());
      data.push(filteredProducts.length);
    } else if (timeFrame === 'Tháng') {
      const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
        labels.push(dayDate.toDateString());
        const count = filteredProducts.filter(product => new Date(product.createdAt).getDate() === day).length;
        data.push(count);
      }
    } else if (timeFrame === 'Năm') {
      for (let month = 0; month < 12; month++) {
        const monthDate = new Date(selectedDate.getFullYear(), month);
        labels.push(monthDate.toLocaleString('default', { month: 'long' }));
        const count = filteredProducts.filter(product => new Date(product.createdAt).getMonth() === month).length;
        data.push(count);
      }
    }

    return { labels, data };
  };

  const { labels, data } = filterDataByTimeFrame(allProducts, timeFrame, selectedDate);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Số lượng sản phẩm thêm (${timeFrame})`,
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalDiscount = discount ? discount.length : 0;
  const totalOrder = order ? order.length : 0;
  const totalProducts = allProducts ? allProducts.length : 0;
  const totalSpecialOffers = special ? special.length : 0;
  const totalReviews = allProducts
  ? allProducts.reduce((acc, product) => acc + (product.review_list ? product.review_list.length : 0), 0)
  : 0;
  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          {...(withCharts && {
            chart: (
              <CChart
                className="position-absolute w-100 h-100"
                type="line"
                data={chartData}
                options={chartOptions}
              />
            ),
          })}
          icon={<CIcon icon={cilCalendarCheck} height={52} className="my-4 text-white" />}
          values={[
            { title: 'Đơn hàng', value: totalOrder.toString() },
          ]}
          style={{
            '--cui-card-cap-bg': '#f9b115',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          values={[
            { title: 'Sản phẩm', value: totalProducts.toString() },
          ]}
          icon={<CIcon icon={cibCmake} height={52} className="my-4 text-white" />}
          style={{
            '--cui-card-cap-bg': '#3b5998',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
      {/* <Link to="/discount/discountlist"> */}
        <CWidgetStatsD
          values={[
            { title: 'Đánh giá', value: totalReviews.toString() },
          ]}
          icon={<CIcon icon={cibCmake} height={52} className="my-4 text-white" />}
          style={{
            '--cui-card-cap-bg': '#ffc56a',
          }}
        />
        {/* </Link> */}
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          values={[
            { title: 'Thành viên', value: alluser ? alluser.length.toString() : '0' },
          ]}
          icon={<CIcon icon={cibCmake} height={52} className="my-4 text-white" />}
          style={{
            '--cui-card-cap-bg': '#31981b',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon icon={cilCalendar} height={52} className="my-4 text-white" />}
          values={[
            { title: 'Chương trình giảm giá', value: totalSpecialOffers.toString() },
          ]}
          style={{
            '--cui-card-cap-bg': '#00aced',
          }}
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsD
          icon={<CIcon icon={cibDiscourse} height={52} className="my-4 text-white" />}
          values={[
            { title: 'Mã giảm giá', value: totalDiscount.toString() },
          ]}
          style={{
            '--cui-card-cap-bg': '#4875b4',
          }}
        />
      </CCol>
    </CRow>
  );
};

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
  className: PropTypes.string,
  order: PropTypes.array,
  alluser: PropTypes.array,
};

export default WidgetsBrand;
