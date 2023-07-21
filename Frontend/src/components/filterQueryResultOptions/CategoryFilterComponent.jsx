import React from 'react'
import Form from 'react-bootstrap/Form';

const CategoryFilterComponent = () => {
  return (
    <div>
      <span className='fw-bold'>Category</span>
      <Form>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx}>
            <Form.Check type="checkbox" id={`check-api2-${idx}`}>
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label style={{cursor: 'pointer'}}>Category - {idx}</Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
    </div>
  )
}

export default CategoryFilterComponent
