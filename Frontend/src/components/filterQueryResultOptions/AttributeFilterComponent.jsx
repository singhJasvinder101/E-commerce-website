import React from 'react'
import { Form } from 'react-bootstrap'

const AttributeFilterComponent = () => {
  return (
    <div>
      {[{ Color: ["red", "blue", "green", "black"] },
      { Ram: ["1TB", "2TB", "4TB"] }].map((item, idx) => (
        <div key={idx} className='mb-3'>
          <Form.Label> <b>{Object.keys(item)}</b> </Form.Label>

          {/* instead of item.Color and item.Ram then map we use object keys */}
          {item[Object.keys(item)].map((i, idx)=>(
            <Form.Check
              key={idx}
              type='checkbox'
              label={i} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default AttributeFilterComponent
