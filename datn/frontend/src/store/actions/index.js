export * from './user-actions';
export * from './cart-actions';
export * from './product-actions';
export * from './category-actions';
export * from './info-actions';
export * from './wishlist-actions';
export * from './topic-actions';
export * from './blog-actions';
export * from './slider-actions';
export * from './brand-actions';
export * from './attribute-actions';






export const Action = {

  /////user
  ERROR: "ERROR",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SIGNUP: "SIGNUP",
  LOGIN_WITH_FACEBOOK:"LOGIN_WITH_FACEBOOK",
  LOGIN_WITH_GOOGLE:"LOGIN_WITH_GOOGLE",
  PROFILE:"PROFILE",
  ADD_ADDRESS: "ADD_ADDRESS",
  GET_ADDRESS:"GET_ADDRESS",

  /////product
  ALL_PRODUCTS:"ALL_PRODUCTS",
  PRODUCT_DETAIL:"PRODUCT_DETAIL",
  GET_PRODUCT_BY_CAT_ID:"GET_PRODUCT_BY_CAT_ID",

  //ATTRIBUTE
  GET_ATTRIBUTE_LIST:"GET_ATTRIBUTE_LIST",
  GET_ATTRIBUTE:"GET_ATTRIBUTE",

  ////cart
  GET_CART:"GET_CART",
  ADD_CART:"ADD_CART",
  UPDATE_CART:"UPDATE_CART",
  DELETE_CART:"DELETE_CART",
  DELETE_CART_ID: "DELETE_CART_ID",

  ///category
  ALL_CATEGORY:"ALL_CATEGORY",
  GET_CATEGORY_BY_PARENT_ID:"GET_CATEGORY_BY_PARENT_ID",

  ///brand
  GET_BRAND_LIST:"GET_BRAND_LIST",
  
  ///info
  GET_INFO:"GET_INFO",

  ///wish-list
  ADD_WISHLIST:"ADD_WISHLIST",
  GET_WISHLIST:"GET_WISHLIST",
  REMOVE_FROM_WISH_LIST:"REMOVE_FROM_WISH_LIST",
  DELETE_WISH_LIST:"DELETE_WISH_LIST",

  ///blog
  GET_BLOGLIST:"GET_BLOGLIST",
  GET_BLOG_DETAILS:"GET_BLOG_DETAILS",
  GET_BLOG_TOPIC_ID:"GET_BLOG_TOPIC_ID",

  ///topic
  GET_TOPIC:"GET_TOPIC",
  GET_TOPIC_BY_PARENT_ID:"GET_TOPIC_BY_PARENT_ID",

  ///slider
  GET_LIST_SLIDER:"GET_LIST_SLIDER"
 


};