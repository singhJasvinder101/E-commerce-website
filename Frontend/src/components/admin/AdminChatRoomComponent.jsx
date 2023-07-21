import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, Row, Toast } from 'react-bootstrap'

const AdminChatRoomComponent = () => {
  const [toast1, closeToast1] = useState(true)
  const close1 = () => {
    closeToast1(false)
  }
  const [toast2, closeToast2] = useState(true)
  const close2 = () => {
    closeToast2(false)
  }

  return (
    <>
      <Row>
        <Col md={6} xs={10}>
          <Toast show={toast1} onClose={close1} className='ms-4 mb-5'>
            <Toast.Header>
              <strong className='me-auto'>Chat with john Doe</strong>
            </Toast.Header>
            <Toast.Body>
              <div style={{ maxHeight: '250px', overflow: 'auto' }}>
                {Array.from({ length: 25 }).map((_, idx) => (
                  <div key={idx}>
                    <p className='bg-primary px-4 py-2 ms-4 rounded-pill text-light'>
                      <b>user wrote</b>: hello this is a chat message
                    </p>
                    <p>
                      <b>Admin wrote</b>: hello this is a chat message
                    </p>
                  </div>
                ))}
              </div>

              <Form>
                <Form.Group
                  className='mb-3' controlId=''>
                  <Form.Label>Write Message</Form.Label>
                  <Form.Control as="textarea" rows={2}></Form.Control>
                </Form.Group>
                <Button variant='success'>Submit</Button>
              </Form>
            </Toast.Body >
          </Toast >
        </Col>

        <Col md={6} xs={10}>
          <Toast show={toast2} onClose={close2} className='ms-4 mb-5'>
            <Toast.Header>
              <strong className='me-auto'>Chat with john Doe</strong>
            </Toast.Header>
            <Toast.Body>
              <div style={{ maxHeight: '250px', overflow: 'auto' }}>
                {Array.from({ length: 25 }).map((_, idx) => (
                  <div key={idx}>
                    <p className='bg-primary px-4 py-2 ms-4 rounded-pill text-light'>
                      <b>user wrote</b>: hello this is a chat message
                    </p>
                    <p>
                      <b>Admin wrote</b>: hello this is a chat message
                    </p>
                  </div>
                ))}
              </div>

              <Form>
                <Form.Group
                  className='mb-3' controlId=''>
                  <Form.Label>Write Message</Form.Label>
                  <Form.Control as="textarea" rows={2}></Form.Control>
                </Form.Group>
                <Button variant='success'>Submit</Button>
              </Form>
            </Toast.Body >
          </Toast >
        </Col>
      </Row>
    </>
  )
}

export default AdminChatRoomComponent
