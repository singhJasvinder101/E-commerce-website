import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import AddToCartMessageComponent from '../../components/AddToCartMessageComponent'
import { Rating } from 'react-simple-star-rating';
import ImageZoom from 'js-image-zoom';

const ProductDetailsPageComponent = ({
    addToCartReduxAction,
    reduxDispatch,
    getProductDetails,
    userInfo,
    writeReviewApiRequest
}) => {
    const { id } = useParams()
    const [qtty, setQtty] = useState(1)
    const [showCartMessage, setShowCartMessage] = useState(false);
    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [productReviewed, setProductReviewed] = useState(false)

    const messageEndRef = useRef(null)

    const addToCartHandler = (productId, quantity) => {
        reduxDispatch(addToCartReduxAction({ productId, quantity }))
        setShowCartMessage(true)
    }

    // console.log(id)
    useEffect(() => {
        var options = {
            // width: 400,
            // height: 230,
            zoomWidth: 500,
            scale: 1.5,
            // offset: { vertical: 0, horizontal: 10 }
        };
        new ImageZoom(document.getElementById("first"), options)
        new ImageZoom(document.getElementById("second"), options)
        new ImageZoom(document.getElementById("third"), options)
    }, [])


    useEffect(() => {
        getProductDetails(id)
            .then(data => {
                setProduct(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError({ error: error.response ? error.response.data.message : error.response.data });
                setIsLoading(false);
            });
    }, [id, productReviewed]) // if productReviewed changes then product data is updated again with our review also

    const sendReviewHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget.elements
        const formInputs = {
            comment : form.comment.value,
            rating : form.rating.value
        }
        if(e.currentTarget.checkValidity() === true) {
            writeReviewApiRequest(product._id, formInputs)
                .then(data => {
                    if(data === "review created"){
                        setProductReviewed("Product reviewed successully!")
                    }
                })
                .catch(err => {
                    setProductReviewed(err.response.data.message ? err.response.data.message : err.response.data)
                })
        }
    }

    // useeffect for scrolling smooth when the productreviewed state chnage and product data changes
    useEffect(() => {
        if(productReviewed){
            // set time out bcoz until product data updated and product reviewed means our review show
            setTimeout(() => {
                messageEndRef.current.scrollIntoView({behaviour: "smooth"})
            }, 200);
        }
    }, [productReviewed])

    return (
        <>
            <AddToCartMessageComponent showCartMessage={showCartMessage} setShowCartMessage={setShowCartMessage} />

            {/* ********** Product item images ********** */}

            <div className="container-fluid position-relative">
                <Row className='mt-3'>
                    {isLoading ? (
                        <h2>Loading product details....</h2>
                    ) : error ? (
                        <h2>{error}</h2>
                    ) : (
                        <>
                            <Col style={{ zIndex: 1, marginTop: '3rem' }} md={4} xs={12}>
                                <ListGroup>
                                    {product.images ? product.images.map((image, idx) => (
                                        <ListGroup.Item key={idx}>
                                            <div id="first">
                                                <Image
                                                    id='first'
                                                    crossOrigin='anonymous'
                                                    className="d-block w-100"
                                                    src={image.path ?? null}
                                                    alt="First slide"
                                                    fluid
                                                />
                                            </div>
                                        </ListGroup.Item>
                                    )) : null}
                                </ListGroup>

                            </Col>
                            {/* ********** Product availabilty, description etc. ********** */}


                            <Col md={8} xs={12} className='py-4 mt-4'>
                                <h3 className='my-2 py-2'>{product.name}</h3>
                                <div className="attributes">
                                    <p className='bg-success d-inline px-1 rounded'>
                                        {console.log(product)}
                                        <Rating className='mb-2' iconsCount={product.rating} readonly size={20} initialValue={product.rating} />
                                        <span className='text-white fw-bold'> ({product.rating})</span>
                                    </p>
                                    {/* <span className='text-secondary fw-bold'>  2223 ratings</span> */}
                                    <span className='text-secondary fw-bold'> {product.reviewsNumber} reviews</span>
                                    <h4 className='my-3'>${product.price} <p style={{ fontSize: '1.2rem' }} className='d-inline text-success size-sm'>16% off</p></h4>
                                    <p>{product.description}</p>
                                </div>
                                <div className='mt-4'>
                                    <ListGroup>
                                        <ListGroup.Item><b>Status</b>: {product.count > 0 ? "in stock" : "out of stock"}</ListGroup.Item>
                                        <ListGroup.Item><b>Price</b>: <span className='fw-bold'>${product.price}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item><b>Quantity</b>:
                                            <Form.Select
                                                className='d-inline mx-3'
                                                style={{ width: '8rem' }}
                                                value={qtty}
                                                onChange={(e) => setQtty(Number(e.target.value))}
                                            >
                                                <option>choose</option>
                                                {[...Array(product.count).keys()].map(x => (
                                                    <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                ))}
                                            </Form.Select>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => addToCartHandler(id, qtty)}>
                                                Add to cart<i className="mx-2 ri-shopping-cart-fill"></i>
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
                                        {product.reviews &&
                                            product.reviews.map((review, idx) => (
                                                <ListGroup.Item key={idx}>{review.user.name} <br />
                                                    <Rating readonly size={20} initialValue={review.rating} /> <br />
                                                    {review.createdAt.substring(0, 10)} <br />
                                                    {review.comment}
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                </div>
                                <hr />

                                {/* *******  sending review section   ******* */}

                                <div>
                                    {!userInfo.name &&
                                        <Alert variant="danger" size="sm" className="ml-2">Login first to write a review</Alert>
                                    }
                                    <Form onSubmit={sendReviewHandler}>
                                        <Form.Label>Write a review</Form.Label>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control as="textarea" name='comment' required disabled={!userInfo.name} rows={3} />
                                            <Form.Select
                                                name='rating' required disabled={!userInfo.name}
                                                aria-label="Default select example">
                                                <option value="">Your Rating</option>
                                                <option value="5">5 (Very Good)</option>
                                                <option value="4">4 (Good)</option>
                                                <option value="3">3 (Average)</option>
                                                <option value="2">2 (Bad)</option>
                                                <option value="1">1 (Awful)</option>
                                            </Form.Select>
                                            <button type='submit' disabled={!userInfo.name} className='my-3 btn btn-primary'>submit</button>
                                            {productReviewed}
                                        </Form.Group>
                                    </Form>
                                    <div ref={messageEndRef}></div>
                                </div>
                            </Col>
                        </>
                    )}
                </Row>
            </div>
        </>
    )
}

export default ProductDetailsPageComponent
