import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import CartItemComponent from "../../../components/CartItemComponent"
import { useParams } from "react-router-dom"
import dateFormat from "dateformat";

const UserOrderDetailsComponent = ({ userInfo, getUser, getOrder, loadPayPalScript }) => {
    const [userAddress, setUserAddress] = useState({})
    const { id } = useParams()
    const [paymentMethod, setPaymentMethod] = useState("")
    const [isPaid, setIsPaid] = useState(false)
    const [isDelievered, setIsDelievered] = useState(false)
    const [orderButtonMessage, setOrderButtonMessage] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartSubtotal, setCartSubtotal] = useState(0)

    const paypalContainer = useRef()
    // console.log(paypalContainer)

    useEffect(() => {
        getUser()
            .then(data => {
                setUserAddress({
                    address: data.address,
                    city: data.city,
                    country: data.country,
                    zipCode: data.zipCode,
                    state: data.state,
                    phoneNumber: data.phoneNumber
                })
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.message)
                }
            })
    }, [])

    useEffect(() => {
        getOrder(id)
            .then(data => {
                // console.log(data.cartItems)
                // console.log(cartItems)
                setPaymentMethod(data.paymentMethod)
                setCartItems(data.cartItems)
                setCartSubtotal(data.orderTotal.cartSubtotal)
                data.isDelievered ? setIsDelievered(true) : setIsDelievered(false)
                data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
                if (data.isPaid) {
                    // setOrderButtonMessage("Order is finished")
                    setButtonDisabled(true)
                } else {
                    if (data.paymentMethod === "pp") {
                        setOrderButtonMessage("Pay for your order")
                    } else if (data.paymentMethod === "cod") {
                        setButtonDisabled(true)
                        setOrderButtonMessage("Wait for your order")
                    }
                }
            })
            .catch(error =>
                console.log(error)
            );
    }, [isPaid, isDelievered, id])

    const orderHandler = () => {
        setButtonDisabled(true);
        if (paymentMethod === "pp") {
            setOrderButtonMessage("To pay for your order click one of the buttons below")
            if (!isPaid) {
                loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder)
            }
        } else {
            setOrderButtonMessage("Your order was placed, Thank you")
        };
    }
    
    const updateStateAfterOrder = (paidAt) => {
        // console.log(paidAt)
        setOrderButtonMessage("Payment done!");
        setIsPaid(paidAt)
        setButtonDisabled(true);
        paypalContainer.current.style = "display: none";
    }
    // console.log(orderButtonMessage)

    return (
        <div className='container-fluid'>
            <Row className='mt-4'>
                <h2 style={{ fontFamily: 'Mulish', letterSpacing: '0.06rem' }}>Order Details</h2>
                <hr />
                <Col md={8} xs={12}>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h3 className='py-2' style={{ fontFamily: 'Mulish' }}>Shipping</h3>
                            <b>Name</b>: {userInfo.name} {userInfo.lastname} <br />
                            <b>Address</b>: {userAddress.address} {userAddress.city} {userAddress.state} {userAddress.zipCode} <br />
                            <b>Phone</b>: {userAddress.phoneNumber}
                        </Col>
                        <Col md={6}>
                            <h3 className='py-2' style={{ fontFamily: 'Mulish' }}>Payment Method</h3>
                            <Form.Select value={paymentMethod} disabled={true}>
                                <option value="pp">
                                    Paypal
                                </option>
                                <option value="cod">
                                    Cash on delievery (delievery may delayed)
                                </option>
                            </Form.Select>
                        </Col>
                        {/* <Row> */}
                        <Col md={6} xs={12}>
                            <Alert className='mt-3' variant={isDelievered ? 'success' : 'danger'}>
                                {isDelievered ? <>delievered at {isDelievered}</> : <>Not delievered</>}
                            </Alert>
                        </Col>
                        <Col md={6} xs={12}>
                            <Alert className='mt-3' variant={isPaid ? 'success' : 'danger'}>
                                {isPaid ? <>Paid on {dateFormat(isPaid, "fullDate")}</> : <> Not paid </>}
                            </Alert>
                        </Col>
                        {/* </Row> */}
                    </Row>

                    <Row className='my-3'>
                        <h2 className='py-3'>Order Items</h2>
                        <ListGroup variant='flush'>
                            {cartItems.map((item, idx) => (
                                <CartItemComponent item={item} key={idx} orderCreated={true} />
                            ))}
                        </ListGroup>
                    </Row>
                </Col>

                <Col md={4} xs={12}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className='border-0'>
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
                                <Button onClick={orderHandler} variant='danger' type='button' disabled={buttonDisabled}>
                                    {orderButtonMessage}
                                </Button>
                            </div>
                            <div ref={paypalContainer} style={{ position: 'relative', zIndex: 1 }}>
                                <div id="paypal-container-element"></div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default UserOrderDetailsComponent
