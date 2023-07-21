import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { TiTick } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import dateFormat from "dateformat";

const UserOrdersPageComponent = ({ getOrders }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
            .then(ordersData => setOrders(ordersData))
            .catch(error => console.error(error));
    }, []);

    return (
        <Row className='container-fluid mt-5 px-auto'>
            <Col md="12">
                <h1>My Orders</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Delivered</th>
                            <th>Order Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {["fa-solid fa-check text-success fw-bold", "fa-solid fa-xmark text-danger fw-bold"].map((item, idx) => ( */}
                        {orders.map((order, idx) => (
                            <tr key={order._id}>
                                <td>{idx + 1}</td>
                                <td>You</td>
                                <td>{dateFormat(order.createdAt)}</td>
                                <td>${order.orderTotal.cartSubtotal}</td>
                                <td>
                                    {order.isDelievered ? (
                                        <i className="fa-solid fa-check text-success fw-bold" />
                                    ) : (
                                        <i className="fa-solid fa-xmark text-danger fw-bold" />
                                    )}
                                </td>
                                <td>
                                    <Link to={`/user/order-details/${order._id}`}>go to order</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};

export default UserOrdersPageComponent;
