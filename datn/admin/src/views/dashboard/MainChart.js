import React, { useEffect, useRef, useState } from 'react';
import {
  CCardBody,
  CCol,
  CButtonGroup,
  CButton,
  CRow,
} from '@coreui/react';

import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MainChart = ({ order }) => {
  const chartRef = useRef(null);
  const [range, setRange] = useState('Tháng');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color');
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color');
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  const calculateRevenue = () => {
    const revenueData = {
      'Ngày': Array(31).fill(0),
      'Tháng': Array(12).fill(0),
      'Năm': Array(10).fill(0) // Assuming last 10 years
    };

    if (order) {
      order.forEach((orderItem) => {
        const orderDate = new Date(orderItem.createdOn);
        const totalCheckout = orderItem.order_checkout.totalCheckout;
        
        if (range === 'Ngày') {
          if (orderDate.getFullYear() === date.getFullYear() && orderDate.getMonth() === date.getMonth()) {
            const day = orderDate.getDate() - 1;
            revenueData['Ngày'][day] += totalCheckout;
          }
        } else if (range === 'Tháng') {
          if (orderDate.getFullYear() === date.getFullYear()) {
            const month = orderDate.getMonth();
            revenueData['Tháng'][month] += totalCheckout;
          }
        } else if (range === 'Năm') {
          const year = orderDate.getFullYear() - (date.getFullYear() - 9);
          if (year >= 0 && year < 10) {
            revenueData['Năm'][year] += totalCheckout;
          }
        }
      });
    }

    return revenueData[range];
  };

  const labels = {
    'Ngày': Array.from({ length: 31 }, (_, i) => `Ngày ${i + 1}`),
    'Tháng': ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    'Năm': Array.from({ length: 10 }, (_, i) => `${date.getFullYear() - 9 + i}`)
  };

  const revenueData = calculateRevenue();

  return (
    <CCardBody>
      <CRow>
        <CCol sm={5}>
          <h4 id="traffic" className="card-title mb-0">
            Biểu đồ doanh thu
          </h4>
          <div className="small text-body-secondary">Khoảng thời gian: {range}</div>
        </CCol>
        <CCol sm={7} className="d-none d-md-block">
          <CButtonGroup className="float-end me-3">
            {['Ngày', 'Tháng', 'Năm'].map((value) => (
              <CButton
                color="outline-secondary"
                key={value}
                className="mx-0"
                active={value === range}
                onClick={() => setRange(value)}
              >
                {value}
              </CButton>
            ))}
          </CButtonGroup>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showMonthYearPicker={range === 'Tháng'}
            showYearPicker={range === 'Năm'}
            dateFormat={range === 'Ngày' ? 'MM/yyyy' : 'yyyy'}
            className="float-end me-3"
          />
        </CCol>
      </CRow>

      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: labels[range],
          datasets: [
            {
              label: 'Doanh thu',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: revenueData,
              fill: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(Math.max(...revenueData) / 5),
              },
            },
          },
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
        }}
      />
    </CCardBody>
  );
};

export default MainChart;
