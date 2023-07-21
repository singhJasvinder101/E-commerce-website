import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import AddToCartMessageComponent from '../../components/AddToCartMessageComponent'
import { Rating } from 'react-simple-star-rating';
import ImageZoom from 'js-image-zoom';
import { useSelector } from 'react-redux';

const imgStyle = {
    // width: '450px',
    // height: '100px',
    height: '600px',
    width: '200px',
    marginBottom: '2rem'
}
const ProductDetailsPageComponent = ({ addToCartReduxAction, reduxDispatch }) => {
    const { id } = useParams()
    const [qtty, setQtty] = useState(1)
    const [showCartMessage, setShowCartMessage] = useState(false);

    const addToCartHandler = (productId, quantity) => {
        reduxDispatch(addToCartReduxAction({ productId, quantity }))
        setShowCartMessage(true)
    }

    // console.log(id)
    useEffect(() => {
        var options = {
            // width: 400,  
            height: 230,
            zoomWidth: 500,
            scale: 1.5,
            offset: { vertical: 0, horizontal: 10 }
        };
        new ImageZoom(document.getElementById("first"), options)
        new ImageZoom(document.getElementById("second"), options)
        new ImageZoom(document.getElementById("third"), options)
    }, [])


    return (
        <>
            <AddToCartMessageComponent showCartMessage={showCartMessage} setShowCartMessage={setShowCartMessage}/>

            {/* ********** Product item images ********** */}

            <div className="container-fluid position-relative">
                <Row className='mt-3'>
                    <Col style={{ zIndex: 1, marginTop: '3rem'}} md={4} xs={12}>
                        <ListGroup>
                            <ListGroup.Item>
                                <div id="first">
                                    <Image
                                        id='first'
                                        crossOrigin='anonymous'
                                        className="d-block w-100"
                                        src="https://images.pexels.com/photos/1161528/pexels-photo-1161528.jpeg?auto=compress&cs=tinysrgb&w=600"
                                        alt="First slide"
                                        fluid
                                    />
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <div id="second">
                                    <Image
                                        crossOrigin='anonymous'
                                        className="d-block w-100"
                                        src="https://media.istockphoto.com/id/956501428/photo/sport-shoes-on-isolated-white-background.jpg?s=612x612&w=0&k=20&c=BdklqnfGUvf02-2CxYsw-AnrbE3e-B5zhE9JQILEEW4="
                                        alt="Second slide"
                                        fluid
                                    />
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div id="third">
                                    <img
                                        crossOrigin='anonymous fluid'
                                        className="d-block w-100"
                                        src="https://cdn.shopify.com/s/files/1/0607/6678/1671/products/057A9502-1.jpg?v=1670325771"
                                        alt="Third slide"

                                    />
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>


                    {/* ********** Product availabilty, description etc. ********** */}


                    <Col md={8} xs={12} className='py-4 mt-4'>
                        <h3 className='my-2 py-2'>Product Title</h3>
                        <div className="attributes">
                            <p className='bg-success d-inline px-1 rounded'>
                                <span className='text-white fw-bold'>3.9</span>
                                <Rating className='mb-2' iconsCount={1} readonly size={20} initialValue={1} />
                            </p>
                            <span className='text-secondary fw-bold'>  2223 ratings</span>
                            <span className='text-secondary fw-bold'> & 471 reviews</span>
                            <h4 className='my-3'>$6253 <p style={{ fontSize: '1.2rem' }} className='d-inline text-success size-sm'>16% off</p></h4>
                            <p>Product description Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, labore eveniet? Cumque autem libero ab itaque velit ad.</p>
                        </div>
                        <div className='mt-4'>
                            <ListGroup>
                                <ListGroup.Item>Status: inStock</ListGroup.Item>
                                <ListGroup.Item>Price: <span className='fw-bold'>$200</span>
                                </ListGroup.Item>
                                <ListGroup.Item>Quantity:
                                    <Form.Select
                                        className='d-inline mx-3'
                                        style={{ width: '8rem' }}
                                        value={qtty}
                                        onChange={(e)=>setQtty(Number(e.target.value))}
                                    >
                                        <option>choose</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Form.Select>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => addToCartHandler(id, qtty)}>
                                            Add to cart<i className ="mx-2 ri-shopping-cart-fill"></i>
                                    </button>
                                    <button className='mx-3 btn btn-danger'>
                                        Buy Now <i className="mx-2 fa-solid fa-bag-shopping"></i>
                                    </button>
                                </ListGroup.Item>
                                <br />
                            </ListGroup>
                        </div>

                        {/* ********** Reviews Section ********** */}

                        <div className='mt-5'>
                            <ListGroup variant='flush'>
                                <h5>REVIEWS</h5>
                                {
                                    Array.from({ length: 5 }).map((item, idx) => (
                                        <ListGroup.Item key={idx}>Cras Just Odio <br />
                                            <Rating readonly size={20} initialValue={5} /> <br />
                                            29-01-2005 <br />
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, laboriosam quo qui suscipit earum delectus? Tenetur asperiores nam deleniti odio ea?
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </div>
                        <hr />

                        {/* *******  sending review section   ******* */}

                        <div>
                            <Alert variant="danger" size="sm" className="ml-2">Login first to write a review</Alert>
                            <Form>
                                <Form.Label>Write a review</Form.Label>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3} />
                                    <Form.Select
                                        aria-label="Default select example">
                                        <option>Your Rating</option>
                                        <option value="5">5 (Very Good)</option>
                                        <option value="4">4 (Good)</option>
                                        <option value="3">3 (Average)</option>
                                        <option value="2">2 (Bad)</option>
                                        <option value="1">1 (Awful)</option>
                                    </Form.Select>
                                    <button className='my-3 btn btn-primary'>submit</button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProductDetailsPageComponent
