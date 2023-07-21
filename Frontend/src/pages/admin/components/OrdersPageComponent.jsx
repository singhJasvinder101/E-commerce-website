import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent'

import { logoutUser } from '../../../../redux/store/slices/userLoginRegisterSlice';
import { useDispatch } from 'react-redux';

import { useEffect, useState } from "react";

const OrdersPageComponent = ({ getOrders }) => {
    const dispatch = useDispatch()

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
            .then((orders) => setOrders(orders))
            .catch((er) => {
                dispatch(logoutUser())
                // console.log(er)
            });
    }, []);
    return (
        <div className="container-fluid">
            <Row className='container-fluid mt-5 px-auto'>
                <Col md={2}>
                    <AdminLinksComponent />
                </Col>
                <Col md="10">
                    <h1>Orders</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Delievered</th>
                                <th>Payment Method</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        {item.user !== null ? (
                                            <>
                                                {item.user.name} {item.user.lastname}
                                            </>
                                        ) : null}
                                    </td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td>{item.orderTotal.cartSubtotal}</td>
                                    <td>
                                        {item.isDelivered ? (
                                            <i className="fa-solid fa-check text-success fw-bold"></i>
                                        ) : (
                                            <i className="fa-solid fa-xmark text-danger fw-bold"></i>
                                        )}
                                    </td>
                                    <td>{item.paymentMethod}</td>
                                    <td>
                                        <Link to={`/admin/order-details/${item._id}`}>
                                            go to order
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default OrdersPageComponent
