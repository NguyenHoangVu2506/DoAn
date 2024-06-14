import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//pages
//category
const CreateCategory = React.lazy(() => import('./views/page/category/CreateCategory'))
const CategoryList = React.lazy(() => import('./views/page/category/CategoryList'))
const UpdateCategory = React.lazy(() => import('./views/page/category/UpdateCategory'))
const DetailCategory = React.lazy(() => import('./views/page/category/DetailCategory'))
const ListTrashCate = React.lazy(() => import('./views/page/category/ListTrashCat'))
////product
const ProductList = React.lazy(() => import('./views/page/product/ProductList'))
const DetailProduct = React.lazy(() => import('./views/page/product/ProductShow'))
const CreateProduct = React.lazy(() => import('./views/page/product/CreateProduct'))
const UpdateProduct = React.lazy(() => import('./views/page/product/UpdateProduct'))
const ListTrashProduct = React.lazy(() => import('./views/page/product/ListTrashProduct'))

////product_sale
const ProductSaleList = React.lazy(() => import('./views/page/productSale/ProductSaleList'))
const DetailProductSale = React.lazy(() => import('./views/page/productSale/ProductSaleShow'))
const CreateProductSale = React.lazy(() => import('./views/page/productSale/CreateProductSale'))
const UpdateProductSale = React.lazy(() => import('./views/page/productSale/UpdateProductSale'))
const ListTrashSale = React.lazy(() => import('./views/page/productSale/ListTrashSale'))

////post
const PostList = React.lazy(() => import('./views/page/post/PostList'))
const DetailPost = React.lazy(() => import('./views/page/post/DetailPost'))
const CreatePost = React.lazy(() => import('./views/page/post/CreatePost'))
const ListTrashPost = React.lazy(() => import('./views/page/post/ListTrashPost'))
const UpdatePost = React.lazy(() => import('./views/page/post/UpdatePost'))
////topic
const TopicList = React.lazy(() => import('./views/page/Topic/TopicList'))
const CreateTopic = React.lazy(() => import('./views/page/Topic/CreateTopic'))
// const ListTrashPost = React.lazy(() => import('./views/page/post/ListTrashPost'))
const UpdateTopic = React.lazy(() => import('./views/page/Topic/UpdateTopic'))

///brand
const CreateBrand = React.lazy(() => import('./views/page/brand/CreateBrand'))
const BrandList = React.lazy(() => import('./views/page/brand/BrandList'))
const UpdateBrand = React.lazy(() => import('./views/page/brand/UpdateBrand'))
const DetailBrand = React.lazy(() => import('./views/page/brand/DetailBrand'))
const ListTrashBrand = React.lazy(() => import('./views/page/brand/ListTrashBrand'))
///Banner
const BannerList = React.lazy(() => import('./views/page/banner/BannerList'))
const DetailBanner = React.lazy(() => import('./views/page/banner/DetailBanner'))
const ListTrashBanner = React.lazy(() => import('./views/page/banner/ListTrashBanner'))
const CreateBanner = React.lazy(() => import('./views/page/banner/CreateBanner'))
const UpdateBanner = React.lazy(() => import('./views/page/banner/UpdateBanner'))
///info
const InfoList = React.lazy(() => import('./views/page/info/InfoList'))
// const CreateInfo = React.lazy(() => import('./views/page/info/CreateInfo'))
// const UpdateInfo = React.lazy(() => import('./views/page/info/UpdateInfo'))

///menu
const MenuList = React.lazy(() => import('./views/page/menu/MenuList'))
const CreateMenu = React.lazy(() => import('./views/page/menu/CreateMenu'))
const UpdateMenu = React.lazy(() => import('./views/page/menu/UpdateMenu'))

////
const OrderList = React.lazy(() => import('./views/page/order/OrderList'))
const OrderDetail = React.lazy(() => import('./views/page/order/DetailOrder'))
const ListTrashOrder = React.lazy(() => import('./views/page/order/ListTrashOrder'))
///
const UserList = React.lazy(() => import('./views/page/user/UserList'))

//////
const ProductListTest = React.lazy(() => import('./views/page/productdanc/ProductListTest'))
const CreateProductTest = React.lazy(() => import('./views/page/productdanc/CreateProductTest'))
//////////////
///page
const PageList = React.lazy(() => import('./views/page/single/PageList'))
const CreatePage = React.lazy(() => import('./views/page/single/CreatePage'))
const UpdatePage = React.lazy(() => import('./views/page/single/UpdatePage'))
////Discount
const DiscountList = React.lazy(() => import('./views/page/discount/DiscountList'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/category/createcategory', name: 'CreateCategory', element: CreateCategory },

  ////////////////////category
  { path: '/category/createcategory', name: 'CreateCategory', element: CreateCategory },
  { path: '/category/categorylist/:page/:limit', name: 'CategoryList', element: CategoryList },
  { path: '/category/updatecategory/:id', name: 'UpdateCategory', element: UpdateCategory },
  { path: '/category/detailcategory/:id', name: 'DetailCategory', element: DetailCategory },
  { path: '/category/list-trash', name: 'ListTrashCate', element: ListTrashCate },
  ///////////////////product
  { path: '/product/createproduct', name: 'CreateProduct', element: CreateProduct },
  { path: '/product/productlist/:page/:limit', name: 'ProductList', element: ProductList },
  { path: '/product/updateproduct/:id', name: 'UpdateProduct', element: UpdateProduct },
  { path: '/product/detailproduct/:id', name: 'DetailProduct', element: DetailProduct },
  { path: '/product/list-trash', name: 'ListTrashProduct', element: ListTrashProduct },

  //////////////////user
  { path: '/user/userlist/:roles', name: 'UserList', element: UserList },
  //////////////product_sale
  { path: '/productsale/productsalelist', name: 'ProductSaleList', element: ProductSaleList },
  { path: '/productsale/detailproductsale/:id', name: 'DetailProductSale', element: DetailProductSale },
  { path: '/productsale/createproductsale', name: 'CreateProductSale', element: CreateProductSale },
  { path: '/productsale/updateproductsale/:id', name: 'UpdateProductSale', element: UpdateProductSale },
  { path: '/productsale/list-trash', name: 'ListTrashSale', element: ListTrashSale },

  ////////////post
  { path: '/post/postlist/:type/:page/:limit', name: 'PostList', element: PostList },
  { path: '/post/updatepost/:id', name: 'UpdatePost', element: UpdatePost },
  { path: '/post/:slug_id', name: 'DetailPost', element: DetailPost },
  { path: '/post/list-trash/:type/:page/:limit', name: 'ListTrashPost', element: ListTrashPost },
  { path: '/post/createpost', name: 'CreatePost', element: CreatePost },
  ////////////topic
  { path: '/topic/topiclist', name: 'TopicList', element: TopicList },
  { path: '/topic/updatetopic/:id', name: 'UpdateTopic', element: UpdateTopic },
  // { path: '/post/:slug_id', name: 'DetailPost', element: DetailPost },
  // { path: '/post/list-trash/:type/:page/:limit', name: 'ListTrashPost', element: ListTrashPost },
  { path: '/topic/createtopic', name: 'CreateTopic', element: CreateTopic },

  ///brand
  { path: '/brand/createbrand', name: 'CreateBrand', element: CreateBrand },
  { path: '/brand/brandlist/:page/:limit', name: 'BrandList', element: BrandList },
  { path: '/brand/updatebrand/:id', name: 'UpdateBrand', element: UpdateBrand },
  { path: '/brand/detailbrand/:id', name: 'DetailBrand', element: DetailBrand },
  { path: '/brand/list-trash', name: 'ListTrashBrand', element: ListTrashBrand },
  ///banner
  { path: '/banner/bannerlist', name: 'BannerList', element: BannerList },
  { path: '/banner/createbanner', name: 'CreateBanner', element: CreateBanner },

  { path: '/banner/updatebanner/:id', name: 'UpdateBanner', element: UpdateBanner },
  { path: '/banner/detailbanner/:id', name: 'DetailBanner', element: DetailBanner },
  { path: '/banner/list-trash', name: 'ListTrashBanner', element: ListTrashBanner },

  ////order
  { path: '/order/orderlist/:page/:limit', name: 'OrderList', element: OrderList },
  { path: '/order/orderdetail/:id', name: 'OrderDetail', element: OrderDetail },
  { path: '/order/list-trash', name: 'ListTrashOrder', element: ListTrashOrder },

  ///////////////////////////////
  { path: '/productdacn/createproduct', name: 'CreateProductTest', element: CreateProductTest },
  { path: '/productdacn/productlist', name: 'ProductListTest', element: ProductListTest },
  { path: '/productdacn/updateproduct/:id', name: 'UpdateProduct', element: UpdateProduct },
  { path: '/productdacn/detailproduct/:id', name: 'DetailProduct', element: DetailProduct },
  { path: '/productdacn/list-trash', name: 'ListTrashProduct', element: ListTrashProduct },
  ////////////info
  { path: '/info/infolist', name: 'InfoList', element: InfoList },
  // { path: '/info/createinfo', name: 'CreateInfo', element: CreateInfo },
  // { path: '/info/updateinfo/:id', name: 'UpdateInfo', element: UpdateInfo },
  ////////////menu
  { path: '/menu/menulist', name: 'MenuList', element: MenuList },
  { path: '/menu/createmenu', name: 'CreateMenu', element: CreateMenu },
  { path: '/menu/updatemenu/:id', name: 'UpdateMenu', element: UpdateMenu },
  ////////////page
  { path: '/page/pagelist', name: 'PageList', element: PageList },
  { path: '/page/createpage', name: 'CreatePage', element: CreatePage },
  { path: '/page/updatepage/:id', name: 'UpdatePage', element: UpdatePage },
  //////////discount
  { path: '/discount/discountlist', name: 'DiscountList', element: DiscountList },


]

export default routes
