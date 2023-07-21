import React from 'react'
import { useState } from 'react';
import { Alert, Button, CloseButton, Col, Container, Form, Image, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GrFormClose } from 'react-icons/gr'

const AdminEditUserPage = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col md={3} xs={3}>
            <Link to="/admin/user" className='btn btn-info'>
              Go Back
            </Link>
          </Col>
          <Col md={6} xs={12}>
            <h2>Edit User</h2>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='formBasicFirstName'>
                <Form.Label> First Name </Form.Label>
                <Form.Control
                  name='name'
                  required
                  defaultValue="John"
                  type='text' />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicLastName'>
                <Form.Label> Last Name </Form.Label>
                <Form.Control
                  name='lastname'
                  required
                  type='text'
                  defaultValue="Doe" />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label> Email </Form.Label>
                <Form.Control
                  name='email'
                  defaultValue="john@12gmail.com"
                  required
                  type="email" />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check
                  name='isAdmin'
                  label='is Admin'
                  type='checkbox' />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Update
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default AdminEditUserPage
