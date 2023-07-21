import React from 'react'
import { useState, useEffect } from 'react';
import { Alert, Button, CloseButton, Col, Container, Form, Image, Row, Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const EditProductPageCompoent = ({ categories = [], fetchProduct }) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const onHover = {
        cursor: 'pointer',
        position: 'absolute',
        top: '-10px',
        left: '5px',
        transform: 'scale(2.5)'
    }
    const { id } = useParams()
    useEffect(() => {
        fetchProduct(id)
            .then(product => {
                console.log(product)
            })
            .catch(err => {
                console.error(err)
            })
    }, [id])


    return (
        <div>
            <Container>
                <Row className='justify-content-md-center mt-5'>
                    <Col md={3} xs={3}>
                        <Link to="/admin/products" className='btn btn-info'>
                            Go Back
                        </Link>
                    </Col>
                    <Col md={6} xs={12}>
                        <h2>Edit Product</h2>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}>
                            <Form.Group className='mb-3' controlId='formBasicName'>
                                <Form.Label> Name </Form.Label>
                                <Form.Control
                                    name='name'
                                    required
                                    defaultValue="panasonic"
                                    type='text' />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                <Form.Label> Description </Form.Label>
                                <Form.Control
                                    name='description'
                                    required
                                    as="textarea"
                                    defaultValue="product description"
                                    rows={3} />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicCount'>
                                <Form.Label> Count in Stock </Form.Label>
                                <Form.Control
                                    name='count'
                                    defaultValue="2"
                                    required
                                    type="number" />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicPrice'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    name='price'
                                    required
                                    type='text'
                                    defaultValue="$200" />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicCategory'>
                                <Form.Label>
                                    Category
                                </Form.Label>
                                <Form.Select
                                    required
                                    name='category'
                                    aria-label='Default select example'>
                                    <option value="">choose category</option>
                                    {/* {console.log(categories)} */}
                                    {categories.map((category) => (
                                        <option key={category._id} label={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>


                            <Row className='mt-5'>
                                <Col md={6}>
                                    <Form.Group className='mb-3' controlId='formBasicAttribute'>
                                        <Form.Label>Choose the attribute and set value</Form.Label>
                                        <Form.Select
                                            name='attrKey'
                                            aria-label='default select example'>
                                            <option value="">Choose Attribute</option>
                                            <option value="red">Color</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className='mb-3' controlId='formBasicAttribute'>
                                        <Form.Label>Attribute Value</Form.Label>
                                        <Form.Select
                                            name='attrKey'
                                            aria-label='default select example'>
                                            <option value="">Attribute Value</option>
                                            <option value="red">Color</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className='mt-4'>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Attribute</th>
                                            <th>Value</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>attr key</td>
                                            <td>attr value</td>
                                            <td><CloseButton /></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className='mb-3' controlId='formBasicNewAttribute'>
                                        <Form.Label>Create new attribute</Form.Label>
                                        <Form.Control
                                            disabled={false}
                                            placeholder='first choose or create a category'
                                            name='newAttrValue'
                                            type='text' />

                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className='mb-3' controlId='formBasicNewAttribute'>
                                        <Form.Label>attribute value</Form.Label>
                                        <Form.Control
                                            disabled={false}
                                            required={true}
                                            placeholder='first choose or create a category'
                                            name='newAttrValue'
                                            type='text' />

                                    </Form.Group>
                                </Col>
                            </Row>

                            <Alert variant='primary'>
                                After typing attribute key and value press enter on one of the field
                            </Alert>

                            <Form.Group controlId='formFileMultiple' className='mb-3'>
                                <Form.Label> Images </Form.Label>
                                <Row>
                                    <Col style={{ position: 'relative' }} md={3} xs={3}>
                                        <img
                                            src="https://img1a.flixcart.com/fk-sp-static/21072015/blue-24744-yepme-8-400x400-imadqtjww8cwpthg.jpeg"
                                            alt=""
                                            className='img-fluid'
                                            fluid />
                                        <i style={onHover} className='bi bi-x text-danger'></i>
                                    </Col>

                                    <Col style={{ position: 'relative' }} md={3} xs={3}>
                                        <img
                                            src="https://img1a.flixcart.com/fk-sp-static/21072015/blue-24744-yepme-8-400x400-imadqtjww8cwpthg.jpeg"
                                            alt=""
                                            className='img-fluid'
                                            fluid />
                                        <i style={onHover} className='bi bi-x text-danger'></i>
                                    </Col>


                                </Row>

                                <Form.Control
                                    required
                                    type='file'
                                    multiple />
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
export default EditProductPageCompoent
