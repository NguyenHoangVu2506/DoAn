import React, { useEffect } from 'react';
import classNames from 'classnames';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons';
import avatar1 from 'src/assets/images/avatars/1.jpg';
import avatar2 from 'src/assets/images/avatars/2.jpg';
import avatar3 from 'src/assets/images/avatars/3.jpg';
import avatar4 from 'src/assets/images/avatars/4.jpg';
import avatar5 from 'src/assets/images/avatars/5.jpg';
import avatar6 from 'src/assets/images/avatars/6.jpg';
import WidgetsBrand from '../widgets/WidgetsBrand';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import MainChart from './MainChart';
import { getOrder } from '../../store/actions/order-actions';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUser } from '../../store/actions';

const Dashboard = () => {
  const { order } = useSelector((state) => state.orderReducer);
  const { alluser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!order) {
      dispatch(getOrder({ sort: 'ctime' }));
    }
  }, [dispatch, order]);

  useEffect(() => {
    if (!alluser) {
      dispatch(GetAllUser({ sort: 'ctime' }));
    }
  }, [dispatch, alluser]);

  const calculateUserOrderPercentage = (userOrders) => {
    if (!order) {
      // Nếu order chưa được fetch, trả về một giá trị mặc định
      return {
        count: 0,
        percentage: 0,
      };
    }

    const totalOrders = order.length;
    const userOrderCount = userOrders.length;
    const percentage = (userOrderCount / totalOrders) * 100;
    return {
      count: userOrderCount,
      percentage: percentage.toFixed(2),
    };
  };


  return (
    <>
      {order && alluser && (
        <WidgetsBrand order={order} alluser={alluser} className="mb-4" withCharts />
      )}      {/* <WidgetsDropdown className="mb-4" /> */}
      <CCard className="mb-4">
        <MainChart order={order} />
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>% đơn hàng theo khách hàng</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Khách hàng</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Đơn hàng</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Phương thức thanh toán
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {alluser &&
                    alluser.map((user, index) => {
                      // Tìm đơn hàng tương ứng với user_id
                      const userAvatar = user.user_avatar || avatar1;
                      const userOrders = order && order.filter((order) => order.order_userId === user._id);
                      const { count, percentage } = calculateUserOrderPercentage(userOrders);
                      // console.log(orderItem)
                      return (
                        <CTableRow key={index}>
                          <CTableDataCell className="text-center">
                            <CAvatar size="md" src={userAvatar} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{user.user_name}</div>
                            <div className="small text-body-secondary text-nowrap">{user.createdAt}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="mb-2">
                              <div className="fw-semibold">{percentage}%</div>
                              <small className="text-body-secondary">{count} Đơn hàng</small>
                              <CProgress thin color="blue" value={percentage} />
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {/* Ví dụ về sử dụng biểu tượng phương thức thanh toán */}
                            <CIcon size="xl" icon={cibCcPaypal} />
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
