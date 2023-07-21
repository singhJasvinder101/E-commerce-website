import React from 'react'
import Form from 'react-bootstrap/Form';

const PriceFilterComponent = () => {
  return (
    <>
      <Form.Label>
        <span 
          className='fw-bold'>
            Price no greater than: $5000
        </span>
      </Form.Label>
      <Form.Range min={10} max={400} style={{width: '80%'}} step={10}/>
    </>
  )
}


export default PriceFilterComponent
