import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent"

import { useDispatch, useSelector } from 'react-redux'
// import { addToCart } from '../../redux/store/slices/cartSlice';
import {addToCart}  from '../../redux/store/slices/cartSlice';

const ProductDetailsPage = () => {
    const reduxDispatch = useDispatch()
    const state = useSelector(state => state.cart)
    localStorage.setItem("cart", JSON.stringify(state))


    return <ProductDetailsPageComponent
        addToCartReduxAction={addToCart }
        reduxDispatch={reduxDispatch} />
}

export default ProductDetailsPage
