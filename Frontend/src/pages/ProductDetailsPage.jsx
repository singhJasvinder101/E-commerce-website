import ProductDetailsPageComponent from "./components/ProductDetailsPageComponent"

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/store/slices/cartSlice';
import axios from "axios";


const ProductDetailsPage = () => {
    const reduxDispatch = useDispatch()
    const state = useSelector(state => state.cart)
    localStorage.setItem("cart", JSON.stringify(state))

    const userInfo = useSelector(state => state.userLoginRegister.userInfo)

    const getProductDetails = async (id) => {
        const { data } = await axios.get(`/api/products/get-one/${id}`)
        return data
    }

    const writeReviewApiRequest = async (productId, formInputs) => {
        const { data } = await axios.post(`/api/users/review/${productId}`, {...formInputs})
        return data
    }

    return (
        <ProductDetailsPageComponent
            addToCartReduxAction={addToCart}
            reduxDispatch={reduxDispatch}
            getProductDetails={getProductDetails}
            userInfo={userInfo}
            writeReviewApiRequest={writeReviewApiRequest}
        />
    )
}

export default ProductDetailsPage
