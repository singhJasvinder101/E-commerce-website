import React from 'react';
import { Form, Button, Container, Row, Col, InputGroup, Spinner, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPageComponent = ({
  registerUserApiRequest, useDispatch, setReduxUserState
}) => {
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const email = form.email.value
    const name = form.name.value
    const lastname = form.lastname.value
    const password = form.password.value
    const confirmPassword = form.confirmPassword.value

    if (
      event.currentTarget.checkValidity() === true &&
      name &&
      lastname &&
      email &&
      password &&
      password === confirmPassword
    ) {
      setRegisterUserResponseState({ loading: true })
      registerUserApiRequest(name, lastname, email, password)
        .then((res) => {
          // console.log(res.success)
          setRegisterUserResponseState({
            success: res.success,
            loading: false
          })
          dispatch(setReduxUserState(res.userCreated))
        })
        .catch((error) => {
          // console.log(error.response)
          if (error.response) {
            setRegisterUserResponseState({
              error: error.response.data ? error.response.data : error.response
            })
          }
        })
    }

    setValidated(true);
  };

  const onChange = () => {
    const password = document.querySelector('input[name=password]');
    const confirmPassword = document.querySelector('input[name=confirmPassword]');

    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true)
    } else {
      setPasswordsMatchState(false)
    }
  };

  return (
    <Container className="my-3">
      <Row className="mt-2 justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Register</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First Name"
                name="name" />
              <Form.Control.Feedback type="invalid">Please enter a valid name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasiclastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="lastname" />
              <Form.Control.Feedback>Please enter a valid name</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  required />
                <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                minLength={3}
                onChange={onChange}
                required 
                isInvalid={!passwordsMatchState} />
              <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
              <Form.Text className='text-muted'>password should have at least 3 characters</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Repeat Password"
                onChange={onChange}
                required 
                isInvalid={!passwordsMatchState} />
              <Form.Control.Feedback type="invalid">Both passwords must match</Form.Control.Feedback>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Do you already have an account? <Link to="/login">Login</Link>
              </Col>
            </Row>

            <Button type="submit">
              {registerUserResponseState &&
                registerUserResponseState.loading === true ? (
                <Spinner
                  as="span"
                  className='mx-2'
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true" />
              ) : (
                ""
              )}
              Submit
            </Button>

            <Alert show={
              registerUserResponseState &&
              registerUserResponseState.error === "user exists"
            } variant="danger">
              User with that email already exists!
            </Alert>

            {/* {console.log(registerUserResponseState.error)} */}
            <Alert show={
              registerUserResponseState &&
              registerUserResponseState.success === "user created"
            } variant="info">
              Registered Successfully!
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPageComponent;
