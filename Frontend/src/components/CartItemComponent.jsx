import React from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import RemoveFromCartComponent from "./RemoveFromCartComponent"
const CartItemComponent = ({
    item,
    orderCreated = false,
    changeCount = false,
    removeFromCartHandler = false
}) => {
    return (
        <>
            <ListGroup.Item variant='flush'>
                {/* {console.log(item)} */}
                <Row>
                    <Col md={2} >
                        <Image
                            src={item.image ? (item.image.path ?? null) : null}
                            // src="http://localhost:5173/images/tablets-category.png"
                            // crossOrigin='anonymous'
                            fluid />
                    </Col>
                    <Col md={4}>
                        <h5>{item.name}</h5><br />
                    </Col>
                    <Col md={2}>
                        <p className='fw-bold'> ${item.price}</p>
                    </Col>
                    <Col md={2}>
                        <Form>
                            {/* {console.log(useSelector(state => state))} */}
                            <Form.Select
                                onChange={
                                    changeCount ? (e) => changeCount(item.productId, e.target.value) : undefined
                                }

                                disabled={orderCreated}
                                value={item.quantity} >
                                {[...Array(item.count).keys()].map((x) =>
                                    <option value={x + 1} key={x + 1}>{x + 1}</option>
                                )}
                            </Form.Select>
                        </Form>
                    </Col>
                    <Col md={2}>
                        <RemoveFromCartComponent
                            orderCreated={orderCreated}
                            productId={item.productId}
                            quantity={item.quantity}
                            price={item.price}
                            removeFromCartHandler={removeFromCartHandler ? removeFromCartHandler : undefined}
                        />
                    </Col>
                </Row>
            </ListGroup.Item>
            <br />
        </>
    )
}

export default CartItemComponent
