import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import ProductReducer from './product-reducer';
import CartReducer from './cart-reducer';
import CategoryReducer from './category-reducer';
import InfoReducer from './info-reducer';
import WishlistReducer from './wishlist-reducer';
import BlogReducer from './blog-reducer';
import TopicReducer from './topic-reducer';
import BrandReducer from './brand-reducer';
import SliderReducer from './slider-reducer';
import MenuReducer from './menu-reducer';
import PageReducer from './page-reducer';


const reducers = combineReducers({
    userReducer: UserReducer,
    productReducer: ProductReducer,
    cartReducer: CartReducer,
    categoryReducer: CategoryReducer,
    infoReducer: InfoReducer,
    wishlistReducer: WishlistReducer,
    blogReducer: BlogReducer,
    topicReducer: TopicReducer,
    brandReducer: BrandReducer,
    sliderReducer: SliderReducer,
    menuReducer:MenuReducer,
    pageReducer:PageReducer,


})
export default reducers