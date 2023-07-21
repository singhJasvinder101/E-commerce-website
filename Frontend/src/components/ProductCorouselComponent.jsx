import React from 'react'
import { Carousel } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap"

const ProductCorouselComponent = () => {
  return (
    <section className='product-corousel text-dark'>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{objectFit: 'cover'}}
            // src="images/02fa67c8ab959d24.jpg"
            src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201812/ecommerce-3546296_1280.jpeg?size=1200:675"
            alt="Second slide"
            />
          <LinkContainer style={{ cursor: 'pointer' }} to="/product-details">
            <Carousel.Caption>
              <h3>Elevate Your Style with Latest Phones</h3>
              <h5>Discover exquisite Phones that elevate style with precision and luxury</h5>
            </Carousel.Caption>
          </LinkContainer>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            // style={{objectFit: 'cover'}}
            // src="https://images.news18.com/ibnlive/uploads/2021/06/1624945730_featured-image-2021-06-29t111724.512.jpg"
            src="images/dd49520660e9cf6f.jpeg"
            alt="First slide"
            />
          <LinkContainer style={{ cursor: 'pointer' }} to="/product-details">
            <Carousel.Caption>
              <h3>Best Seller in watch category</h3>
              <h5>Discover the Perfect Timepiece: Explore Our Exquisite Watch Collection</h5>
            </Carousel.Caption>
          </LinkContainer>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            // src="images/934b044051a14588.jpeg"
            src="https://images.indianexpress.com/2020/04/iPhone-SE-2020-1.jpg"
            alt="Third slide"
            />

          <LinkContainer style={{ cursor: 'pointer' }} to="/product-details">
            <Carousel.Caption>
              <h3>Best seller in Laptops</h3>
              <h5>
                Dell inspiron i5 3000 Laptop , 15.6 inch HD
              </h5>
            </Carousel.Caption>
          </LinkContainer>
        </Carousel.Item>
      </Carousel>
    </section>
  )
}

export default ProductCorouselComponent
