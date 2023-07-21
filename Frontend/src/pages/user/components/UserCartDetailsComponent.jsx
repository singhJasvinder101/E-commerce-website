import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import CartItemComponent from "../../../components/CartItemComponent"
import {useNavigate} from "react-router-dom"
const UserCartDetailsComponent = ({
    cartItems,
    itemsCount,
    cartSubtotal,
    addToCart,
    removeFromCart,
    dispatch,
    getUser,
    userInfo,
    createOrder
}) => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [userAddress, setUserAddress] = useState(false);
    const [missingAddress, setMissingAddress] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("pp")

    const navigate = useNavigate()

    const changeCount = (productId, quantity) => {
        dispatch(addToCart({ productId, quantity: parseInt(quantity) }))
    }
    const removeFromCartHandler = (productId, quantity, price) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(removeFromCart({ productId, quantity, price }));
        }
    }
    useEffect(() => {
        getUser()
            .then((data) => {
                // console.log(data);
                if (!data.address || !data.country || !data.city || !data.state || !data.zipCode || !data.phoneNumber) {
                    setButtonDisabled(true)
                    setMissingAddress("In order to make payment you need to complete your profile")
                } else {
                    setUserAddress({
                        address: data.address,
                        city: data.city,
                        country: data.country,
                        zipCode: data.zipCode,
                        state: data.state,
                        phoneNumber: data.phoneNumber
                    })
                    setMissingAddress(false)
                }
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.message)
                }
            })
    }, [])

    const orderHandler = () => {
        const orderData = {
            orderTotal: {
                itemsCount: itemsCount,
                cartSubtotal: cartSubtotal,
            },
            cartItems: cartItems.map(item => {
                return {
                    productId: item.productId,
                    name: item.name,   
                    price: item.price,
                    image: {path: item.image ? (item.image.path ?? null) : null},
                    quantity: item.quantity,
                    count: item.count
                }
            }),
            paymentMethod: paymentMethod,
        }
        // console.log(orderData)
        createOrder(orderData)
        .then(data => {
            if(data){
                navigate("/user/order-details/" + data._id)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const paymentMethods = (e) => {
        setPaymentMethod(e.target.value)
    };

    return (
        <div className='container-fluid'>
            {/* {console.log(cartItems)} */}
            <Row className='mt-4'>
                <h2
                    style={{ fontFamily: 'Mulish', letterSpacing: '0.06rem' }}>
                    Cart Details
                </h2>

                <hr />
                {/* {console.log(userAddress.address)} */}

                <Col md={8} xs={12}>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h3 className='py-2' style={{ fontFamily: 'Mulish' }}>Shipping</h3>
                            <b>Name</b>: {userInfo.name} {userInfo.lastname} <br />
                            <b>Address</b>: {userAddress.address} <br />
                            <b>Phone</b>: {userAddress.phoneNumber} <br />
                        </Col>
                        <Col md={6}>
                            <h3 className='py-2' style={{ fontFamily: 'Mulish' }}>Payment Method</h3>
                            <Form.Select onChange={paymentMethods}>
                                <option value="pp">
                                    Paypal
                                </option>
                                <option value="cod">
                                    Cash on delievery (delievery may delayed)
                                </option>
                            </Form.Select>
                        </Col>
                        <Row>
                            <Col md={6} xs={12}>
                                <Alert className='mt-3 ' variant='danger'>
                                    Not delievered. {missingAddress}
                                </Alert>
                            </Col>
                            <Col md={6} xs={12}>
                                <Alert className='mt-3 mx-3' variant='success'>
                                    Not payed yet
                                </Alert>
                            </Col>
                        </Row>
                    </Row>

                    <Row className='my-3'>
                        <h2 className='py-3'>Order Items</h2>
                        {cartItems.length === 0
                            ? (<Alert variant='info'>
                                <h5 className='text-center'>Your cart is empty</h5>
                            </Alert>)
                            : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((item, idx) => (
                                        <CartItemComponent
                                            item={item}
                                            key={idx}
                                            removeFromCartHandler={removeFromCartHandler}
                                            changeCount={changeCount}
                                        />
                                    ))}
                                </ListGroup>
                            )};
                    </Row>
                </Col>

                <Col md={4} xs={12}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Items price (after tax): <span className='fw-bold'>${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Shipping: <span className='fw-bold'>included</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Tax: <span className='fw-bold'>included</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='text-danger'>
                            Total Price: <span className='fw-bold'>${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button disabled={buttonDisabled} onClick={orderHandler} variant='danger' type='button'>
                                    Place order
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

            </Row>
        </div>
    )
}

export default UserCartDetailsComponent
