import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Col, Container, Form, Image, Row, Table } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrFormClose } from 'react-icons/gr'

const EditUserPageComponent = ({
    updateUserDetailsApiRequest,
    fetchUser
}) => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState([])
    const [isAdminState, setIsAdminState] = useState(false)
    const [updateUserResponseState, setUpdateUserResponseState] = useState({
        message: "", error: "",
    })

    const { id } = useParams()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget.elements;

        const name = form.name.value
        const lastname = form.lastname.value
        const email = form.email.value

        if (event.currentTarget.checkValidity() === true) {
            updateUserDetailsApiRequest(id, name, lastname, email, isAdminState)
                .then(data => {
                    if (data === "User updated") {
                        navigate("/admin/user")
                    }
                })
                .catch(error => {
                    setUpdateUserResponseState({ error: error.response ? error.response.data.message : error.response.data });
                })
        }

        setValidated(true);
    };

    useEffect(() => {
        fetchUser(id)
            .then(data => {
                setUser(data);
                setIsAdminState(data.isAdmin);
            })
            .catch(err => updateUserResponseState(err.response ? err.response.data.message : err.message))
    }, [id])

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
                                    defaultValue={user.name}
                                    type='text' />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicLastName'>
                                <Form.Label> Last Name </Form.Label>
                                <Form.Control
                                    name='lastname'
                                    required
                                    type='text'
                                    defaultValue={user.lastname} />
                            </Form.Group>
                            {/* {console.log(user)} */}

                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label> Email </Form.Label>
                                <Form.Control
                                    name='email'
                                    defaultValue={user.email}
                                    required
                                    type="email" />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                                <Form.Check
                                    name='isAdmin'
                                    label='is Admin'
                                    type='checkbox'
                                    checked={isAdminState}
                                    onChange={(e) => setIsAdminState(e.target.checked)}
                                />
                            </Form.Group>
                            {console.log(isAdminState)}

                            <Button variant='primary' type='submit'>
                                Update
                            </Button>
                            {updateUserResponseState.error}

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default EditUserPageComponent
