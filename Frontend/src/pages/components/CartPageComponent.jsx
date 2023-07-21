import { Alert, Button, Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CartItemComponent from '../../components/CartItemComponent'

const CartPageComponent = ({
    addToCart,
    dispatch,
    cartItems,
    cartSubtotal,
    removeFromCart,
    cart
}) => {

    const changeCount = (productId, quantity) => {
        dispatch(addToCart({ productId, quantity: parseInt(quantity) }))
        // console.log(typeof(quantity))

        const updatedCartItems = cart.cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity: parseInt(quantity) } : item
        );
        const updatedCart = {
            ...cart,
            cartItems: updatedCartItems,
            itemsCount: updatedCartItems.reduce((count, item) => count + (item.quantity || 0), 0),
            cartSubtotal: updatedCartItems.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0)
        };
        // console.log(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    const removeFromCartHandler = (productId, quantity, price) => {
        if (window.confirm("Are you sure you want to remove the item ?")) {
            dispatch(removeFromCart({ productId, quantity, price }));
        }
    };

    return (
        <>
            {/* {console.log(cartItems)} */}
            <div className="container-fluid">
                <Row className='my-4'>

                    {/* ******  shopping items component  ****** */}

                    <Col md={9}>
                        <h2 className='text-center py-3'>Shopping Cart</h2>
                        {cartItems.length === 0
                            ? (<Alert variant='info'>
                                <h5 className='text-center'>Your cart is empty</h5>
                            </Alert>)
                            : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, idx) => (
                                        <CartItemComponent
                                            changeCount={changeCount}
                                            item={item}
                                            key={idx}
                                            removeFromCartHandler={removeFromCartHandler}
                                        />
                                    ))}
                                </ListGroup>
                            )}
                    </Col>


                    {/* *****  Price details of the items in cart ***** */}

                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4 className='text-secondary'>PRICE DETAILS</h4>
                                <hr />
                            </ListGroup.Item>
                            <ListGroup.Item className='fw-bold'>
                                <h4>Cart Items({cartItems.length})</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                cart subtotal : <span className='fw-bold'>${cartSubtotal}</span>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {cartItems.length === 0 ? (
                                    <button className='btn btn-primary' disabled>Proceed to checkout</button>
                                ) : (
                                    <Link to='/user/cart-details' className='btn btn-primary'>Proceed to checkout</Link>
                                )}
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                </Row>
            </div >
        </>
    )
}

export default CartPageComponent
