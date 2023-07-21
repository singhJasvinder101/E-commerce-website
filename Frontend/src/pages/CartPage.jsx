import CartPageComponent from './components/CartPageComponent'
import { useSelector, useDispatch } from "react-redux"
import { addToCart, removeFromCart } from '../../redux/store/slices/cartSlice'

const CartPage = () => {
  const cart = useSelector((state) => state.cart)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const cartSubtotal = useSelector((state) => state.cart.cartSubtotal)
  const dispatch = useDispatch()

  return <CartPageComponent
    cart={cart}
    addToCart={addToCart}
    dispatch={dispatch}
    cartItems={cartItems}
    cartSubtotal={cartSubtotal}
    removeFromCart={removeFromCart}
  />
}

export default CartPage
