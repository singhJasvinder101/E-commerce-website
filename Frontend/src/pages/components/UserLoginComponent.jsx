import React from 'react';
import { Form, Button, Container, Row, Col, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserLoginPageComponent = ({ userLoginApiRequest, reduxDispatch, setReduxUserState }) => {
    const [validated, setValidated] = useState(false);
    const [loginUserResponseState, setLoginUserResponseState] = useState({
        success: "",
        error: "",
        loading: false,
    });

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        // to check validity of all the elements of form

        const email = form.email.value;
        const password = form.password.value;
        const donotlogout = form.donotlogout.checked;

        // console.log(form.email)

        if (event.currentTarget.checkValidity() === true && email && password) {
            setLoginUserResponseState({ loading: true })
            userLoginApiRequest(email, password, donotlogout)
                .then((res) => {
                    // console.log(res)
                    setLoginUserResponseState({
                        success: res.success, loading: false, error: ""
                    })

                    if(res.userLoggedIn){
                        reduxDispatch(setReduxUserState(res.userLoggedIn))
                    }

                    if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) 
                        window.location.assign('/user')   
                    else window.location.assign('/admin/orders')
                })
                .catch((err) => {
                    // console.log(err.response.data.message ? err.response.data.message : err.response.data)
                    setLoginUserResponseState({
                        error: err
                        // err.response.data.message ?
                        // err.response.data.message : err.response.data
                    })
                })
        }

        setValidated(true);
    };

    return (
        <Container className="my-3">
            <Row className="mt-2 justify-content-center">
                <Col md={6}>
                    <h2 className="text-center">Login</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    required />
                                <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="password"
                                required />
                            <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
                            <Form.Check
                                name='donotlogout'
                                type='checkbox'
                                label='Do not logout' />
                        </Form.Group>


                        <Row className="pb-2">
                            <Col>
                                Do't you have an account? <Link to="/register">Register</Link>
                            </Col>
                        </Row>

                        <Button type="submit" className='mt-2'>
                            {loginUserResponseState && loginUserResponseState.loading === true ?
                                (< Spinner
                                    className='mx-2'
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true" />) : ("")}
                            Submit
                        </Button>

                        {loginUserResponseState &&
                            <Alert className='mt-3' show={loginUserResponseState.error ===
                                "wrong credentials"} variant="danger">
                                Wrong Credentials
                            </Alert>}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UserLoginPageComponent;
