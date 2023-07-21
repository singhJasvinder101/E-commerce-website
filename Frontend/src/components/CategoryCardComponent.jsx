import React from 'react'
import './Categorycard.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
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
`;

const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://rukminim1.flixcart.com/image/612/612/xif0q/watch/t/r/5/-original-imagqfu3mnhxw25p.jpeg?q=70",
    "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFibGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://media.istockphoto.com/id/182927542/photo/printer-and-scanner.webp?b=1&s=170667a&w=0&k=20&c=fun6kS9q-_-GOE3W9BmOvPNTe-OdTYpsbD53lj3LH4U=",
    "https://plus.unsplash.com/premium_photo-1661592645319-cb83e4c6b324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mdHdhcmVzJTIwaW1hZ2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1524006231331-78f794ebbbac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhJTIwaW1hZ2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://media.istockphoto.com/id/1158413597/photo/composition-with-books-on-the-table.webp?b=1&s=170667a&w=0&k=20&c=EaTlcV16ocCqsteyory_CRiYqIW5VwI1PytlkxhN8UQ=",
]


const CategoryCardComponent = ({ category, idx }) => {
    return (
        <Wrapper>
            <div className="card" style={{ width: '20rem', borderRadius: '5rem !important' }}>
                <Link to="">
                    <img
                        crossOrigin='anonymous'
                        style={{ height: '15rem', objectFit: 'cover' }}
                        src={images[idx]}
                        className="card-img-top"
                        alt="product-image"
                    />
                </Link>
                <div className="d-flex justify-content-around my-2">
                    <h5 className="card-title text-center fw-bold">{category}</h5>
                </div>
                <div className="container">
                    <div className="d-flex justify-content-left">
                        <div className="svgs" style={{ marginRight: '0.5rem' }}>
                            <Rating size={20} initialValue={5} />
                        </div>
                        <div className="right d-flex mt-1 justify-content-between" style={{flexGrow: '1'}}>
                            <h5 className="text-primary-emphasis">5.0</h5>
                            {/* <span className=''> */}
                                <Link to="product-list" className='text-decoration-none text-dark'> category
                                    <img className='goto' src='images/external.png' />
                                </Link>
                            {/* </span> */}
                        </div>
                    </div>
                </div>
                <div className='container d-flex justify-content-between my-1'>
                    <h4>$8346</h4>
                    <a href="#" className="btn btn-primary">Add to cart</a>
                </div>

            </div>
        </Wrapper>
    )
}

export default CategoryCardComponent;
