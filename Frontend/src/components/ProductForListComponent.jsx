import React from 'react'
import './Categorycard.css'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';

const Wrapper = styled.div`
    .svg-icon{
        width: 1.2rem;
        height: 1.2rem;
    }
    .card{
        // border-radius: 22rem;
        margin: 0.5rem;
    }
    .container img{
        height: 0.6rem;
    }
    p{
        margin-bottom: 0;
    }
`;


const ProductForListComponent = ({ productId, name, description, price, images, rating, reviewsNumber }) => {
    // console.log(idx)
    const {id} = useParams()
        

    return (
        <Wrapper>
            <div className="card" style={{height: 'auto'}}>
                <Row className='my-2'>
                    <Col lg={5} >
                        <Link to="">
                            <img
                                crossOrigin='anonymous'
                                style={{ objectFit: 'cover',height: '100%' }}
                                src={images[0] ? images[0].path : ''}
                                className="card-img-top"
                                alt="product-image"
                            />
                        </Link>
                    </Col>
                    <Col lg={7}>
                        <div className="mx-3 mt-4">
                            <h5 className="card-title text-left">{name}</h5>
                            <p style={{fontSize: '0.95rem'}}>{description}</p>
                        </div>
                        <div className="container">
                            <div className="d-flex justify-content-left align-items-center my-3">
                                <Rating readonly initialValue={rating} className='mb-1' size={20}/>
                                <span className="fw-bold text-primary-emphasis mx-1">{rating}</span>
                                <span>({reviewsNumber})</span>
                                <Link to="product-list" style={{ marginLeft: '3rem' }} className='text-decoration-none text-dark'>category <span><img className='goto' src='images/external.png'></img></span></Link>
                            </div>
                        </div>
                        <div className='container d-flex justify-content-left my-1'>
                            <h4>${price}</h4>
                            <Link to={`/product-details/${productId}`} className="btn btn-primary mx-5 cursor-pointer">More Details</Link>
                        </div>
                    </Col>
                </Row>

            </div>
        </Wrapper>
    )
}

export default ProductForListComponent
