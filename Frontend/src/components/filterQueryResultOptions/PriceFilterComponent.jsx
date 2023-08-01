import React from 'react'
import Form from 'react-bootstrap/Form';

const PriceFilterComponent = ({ price, setPrice }) => {
  return (
    <>
      <Form.Label>
        <span
          className='fw-bold'> 
          Price no greater than: ${price}
        </span>
      </Form.Label>
      <Form.Range
        min={10}
        max={400}
        style={{ width: '80%' }}
        step={10}
        onChange={(e) => {
          setPrice(e.target.value)
        }}
      />
    </>
  )
}


export default PriceFilterComponent
