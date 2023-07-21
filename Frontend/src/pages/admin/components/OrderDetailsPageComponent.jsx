import React from 'react'
import { Alert, Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import CartItemComponent from "../../../components/CartItemComponent"

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import dateFormat from "dateformat";

import { logoutUser } from '../../../../redux/store/slices/userLoginRegisterSlice';
import { useDispatch } from 'react-redux';

const OrderDetailsPageComponent = ({ getOrder, markAsDelivered }) => {
    const dispatch = useDispatch();

    const { id } = useParams()
    const [userInfo, setUserInfo] = useState({})
    const [paymentMethod, setPaymentMethod] = useState("");
    const [isPaid, setIsPaid] = useState(false);
    const [isDelievered, setisDelievered] = useState(false);
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [orderButtonMessage, setOrderButtonMessage] =
        useState("Mark as delivered");
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getOrder(id)
            .then((order) => {
                // console.log(order);
                setUserInfo(order.user);
                setPaymentMethod(order.paymentMethod);
                order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
                order.isDelievered
                    ? setisDelievered(order.delieveredAt)
                    : setisDelievered(false);
                setCartSubtotal(order.orderTotal.cartSubtotal);
                if (order.isDelievered) {
                    setOrderButtonMessage("Order is finished");
                    setButtonDisabled(true);
                }
                setCartItems(order.cartItems);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    dispatch(logoutUser());
                }else {
                    console.log(error)
                }
            })
        // console.log(isPaid)
    }, [isDelievered, id]);

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
                            <b>Address</b>: {userInfo.address} {userInfo.city}{" "}
                            {userInfo.state} {userInfo.zipCode} <br />
                            <b>Phone</b>: {userInfo.phoneNumber}
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
                            <Alert className='mt-3 ' variant={isDelievered ? "success" : "danger"}>
                                {isDelievered ? (
                                    <>Delivered at {dateFormat(isDelievered, "fullDate")}</>
                                ) : (
                                    <>Not delivered</>
                                )}
                            </Alert>
                        </Col>
                        <Col md={6} xs={12}>
                            <Alert className="mt-3 " variant={isPaid ? "success" : "danger"}>
                                {isPaid ? <>Paid on {dateFormat(isPaid, "fullDate")}</> : <>Not paid yet</>}
                            </Alert>
                        </Col>
                        {/* </Row> */}
                    </Row>

                    <Row className='my-3'>
                        <h2 className='py-3'>Order Items</h2>
                        <ListGroup variant='flush'>
                            {cartItems.map((item, idx) => (
                                <CartItemComponent key={idx} item={item} orderCreated={true} />
                            ))}
                        </ListGroup>
                    </Row>
                </Col>

                <Col md={4} xs={12}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Items price (after tax): <span className="fw-bold">${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Shipping: <span className='fw-bold'>included</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Tax: <span className='fw-bold'>included</span>
                        </ListGroup.Item>
                        <ListGroup.Item className='text-danger'>
                            Total Price: <span className="fw-bold">${cartSubtotal}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-grid gap-2">
                                <Button
                                    onClick={() => {
                                        markAsDelivered(id)
                                            .then((res) => {
                                                if (res) {
                                                    setisDelievered(true);
                                                }
                                            })
                                            .catch((er) => { console.log(er) })
                                    }}
                                    disabled={buttonDisabled}
                                    variant="danger" type='button'>
                                    {orderButtonMessage}
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

            </Row>
        </div>
    )
}

export default OrderDetailsPageComponent
