export * from './user-actions';
export * from './cart-actions';
export * from './product-actions';
export * from './category-actions';
export * from './info-actions';
export * from './wishlist-actions';
export * from './topic-actions';
export * from './blog-actions';
export * from './brand-actions';
export * from './slider-actions';
export * from './upload-actions';



export const Action = {

  /////user
  ERROR: "ERROR",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SIGNUP: "SIGNUP",
  LOGIN_WITH_FACEBOOK: "LOGIN_WITH_FACEBOOK",
  LOGIN_WITH_GOOGLE: "LOGIN_WITH_GOOGLE",
  PROFILE: "PROFILE",
  ADD_ADDRESS: "ADD_ADDRESS",
  GET_ADDRESS: "GET_ADDRESS",
  GET_ALL_USER: "GET_ALL_USER",

  /////
  ALL_PRODUCTS: "ALL_PRODUCTS",
  PRODUCT_DETAIL: "PRODUCT_DETAIL",
  GET_PRODUCT_BY_CAT_ID: "GET_PRODUCT_BY_CAT_ID",
  CREATE_PRODUCT:"CREATE_PRODUCT",
  GET_PRODUCT_BY_ID:"GET_PRODUCT_BY_ID",
  ////
  GET_CART: "GET_CART",
  ADD_CART: "ADD_CART",
  UPDATE_CART: "UPDATE_CART",
  DELETE_CART: "DELETE_CART",
  DELETE_CART_ID: "DELETE_CART_ID",

  ///
  GET_CATEGORY: "GET_CATEGORY",
  GET_CATEGORY_BY_PARENT_ID: "GET_CATEGORY_BY_PARENT_ID",
  GET_CHILD_CATEGORY_BY_PARENT_ID: "GET_CHILD_CATEGORY_BY_PARENT_ID",
  ADD_CATEGORY: "ADD_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  GET_CATEGORY_BY_ID: "GET_CATEGORY_BY_ID",

  ///
  GET_BRAND: "GET_BRAND",
  ADD_BRAND: "ADD_BRAND",
  UPDATE_BRAND: "UPDATE_BRAND",
  GET_BRAND_BY_ID: "GET_BRAND_BY_ID",

  ///
  GET_SLIDER: "GET_SLIDER",
  ADD_SLIDER: "ADD_SLIDER",
  UPDATE_SLIDER: "UPDATE_SLIDER",
  GET_SLIDER_BY_ID: "GET_SLIDER_BY_ID",
  PUBLISHED: "PUBLISHED",
  UNPUBLISHED: "UNPUBLISHED",
  DELETETRASH: "DELETETRASH",
  RESTORE:"RESTORE",
  LISTTRASH:"LISTTRASH",
  DELETE:"DELETE",
  ///
  UPDATE_INFO: "UPDATE_INFO",
  GET_INFO: "GET_INFO",

  ///
  ADD_WISHLIST: "ADD_WISHLIST",
  GET_WISHLIST: "GET_WISHLIST",

  ///
  GET_BLOGLIST: "GET_BLOGLIST",
  GET_BLOG_DETAILS: "GET_BLOG_DETAILS",
  GET_BLOG_TOPIC_ID: "GET_BLOG_TOPIC_ID",
  ADD_BLOG: "ADD_BLOG",
  UPDATE_BLOG: "UPDATE_BLOG",
  GET_BLOG_BY_ID: "GET_BLOG_BY_ID",

  ///
  ADD_TOPIC: "ADD_TOPIC",
  GET_TOPIC: "GET_TOPIC",
  GET_TOPIC_BY_PARENT_ID: "GET_TOPIC_BY_PARENT_ID",
  GET_TOPIC_BY_ID: "GET_TOPIC_BY_ID",
  UPDATE_TOPIC: "UPDATE_TOPIC",

  //
  UPDATED_MENU: "UPDATED_MENU",
  ADD_MENU: "ADD_MENU",
  GET_MENU: "GET_MENU",
  GET_MENU_BY_ID: "GET_MENU_BY_ID",
  PUBLISHED: "PUBLISHED",
  UNPUBLISHED: "UNPUBLISHED",
  DELETETRASH: "DELETETRASH",
  RESTORE:"RESTORE",
  LISTTRASH:"LISTTRASH",
  DELETE:"DELETE",


  //upload
  UPLOAD_IMAGE_SINGLE: "UPLOAD_IMAGE_SINGLE",
  UPLOAD_IMAGE_SINGLE_ARRAY: "UPLOAD_IMAGE_SINGLE_ARRAY",

  ///Page
  UPDATE_PAGE: "UPDATE_PAGE",
  ADD_PAGE: "ADD_PAGE",
  GET_PAGE: "GET_PAGE",
  GET_PAGE_BY_ID: "GET_PAGE_BY_ID",

  ///discount
  UPDATE_DISCOUNT: "UPDATE_DISCOUNT",
  ADD_DISCOUNT: "ADD_DISCOUNT",

  GET_DISCOUNT: "GET_DISCOUNT",
  /////////////order
  GET_ORDER: "GET_ORDER",
  UPDATE_STATUS: "UPDATE_STATUS",
  GET_ORDER_BY_ID:"GET_ORDER_BY_ID",
  /////special-offer
  GET_SPECIAL: "GET_SPECIAL",
  ADD_SPECIAL: "ADD_SPECIAL",
  UPDATE_SPECIAL: "UPDATE_SPECIAL",
  GET_SPECIAL_BY_ID:"GET_SPECIAL_BY_ID",
  ///attributes
  GET_ATTRIBUTES: "GET_ATTRIBUTES",
  ADD_ATTRIBUTES: "ADD_ATTRIBUTES",

};