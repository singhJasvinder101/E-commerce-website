import React from 'react'
import { Form } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'


const RatingFilterComponent = ({ setRatingsFromFilter }) => {
  return (
    <div>
      <span className='fw-bold'>Rating</span>
      {
        Array.from({ length: 5 }).map((_, idx) => (
          <Form.Check key={idx} type="checkbox" id={`check-api-${idx}`}>
            <Form.Check.Input
              type="checkbox"
              isValid
              onChange={e => {
                setRatingsFromFilter(item => {
                  // its not array its used to overwride the value correspon to dynamic key
                  // if more then one rating selected then adjusted with , 
                  return {
                    ...item, [5-idx]: !!e.target.value
                  }
                })
              }}
            />
            <Form.Check.Label style={{ cursor: 'pointer' }}>
              <Rating readonly size={20} initialValue={5 - idx} />
            </Form.Check.Label>
          </Form.Check>
        ))
      }
    </div>
  )
}

export default RatingFilterComponent
