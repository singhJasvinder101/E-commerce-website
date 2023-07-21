import UserCartDetailsComponent from './components/UserCartDetailsComponent'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../../redux/store/slices/cartSlice'
import axios from 'axios'
const UserCartDetails = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.userLoginRegister.userInfo)

  const getUser = async () =>{
    const {data} = await axios.get("/api/users/profile/" + userInfo._id)
    return data
  }

  const createOrder = async (orderData) => {
    const { data } = await axios.post("/api/orders", {...orderData})
    // console.log(data)
    return data
  }

  return <UserCartDetailsComponent
    cartItems={cart.cartItems}
    itemsCount={cart.itemsCount}
    cartSubtotal={cart.cartSubtotal}
    addToCart={addToCart}
    removeFromCart={removeFromCart}
    dispatch={dispatch}
    getUser={getUser}
    userInfo={userInfo}
    createOrder={createOrder}
  />
}

export default UserCartDetails
