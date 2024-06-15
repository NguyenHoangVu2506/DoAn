import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Sản phẩm',
    to: '/product',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh mục',
        to: '/category/categorylist/1/10',
      },
      {
        component: CNavItem,
        name: 'Thương hiệu',
        to: '/brand/brandlist/1/10',
      },
      {
        component: CNavItem,
        name: ' Tất cả sản phẩm',
        to: '/product/productlist/1/10',
      },
      {
        component: CNavItem,
        name: 'Chương trình giảm giá',
        to: '/productsale/productsalelist',
      },
      {
        component: CNavItem,
        name: 'Mã giảm giá',
        to: '/discount/discountlist',
      },
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Bài viết',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: ' Bài viết',
        to: '/post/postlist/news/1/10',
      },
      {
        component: CNavItem,
        name: 'Chủ đề',
        to: '/topic/topiclist',
      },
      {
        component: CNavItem,
        name: 'Trang đơn',
        to: '/page/pagelist',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Đơn hàng',
    to: '/order/orderlist/1/10',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Liên hệ',
  //   to: '/charts/b',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Thành viên',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Khách hàng',
    to: '/user/userlist/:roles',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Giao diện',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/banner/bannerlist',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      //////////da
      {
        component: CNavItem,
        name: 'Menu',
        to: '/menu/menulist',
      },

      ///////////////
      {
        component: CNavItem,
        name: 'Info',
        to: '/info/infolist',
      },
    ],
  },
  /////////////da
  // {
  //   component: CNavGroup,
  //   name: 'Cửa hàng',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Config',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Liên hệ',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Trang đơn',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  ///////
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
