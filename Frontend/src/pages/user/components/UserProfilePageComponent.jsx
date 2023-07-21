import React, { useState, useEffect  } from 'react';
import "../UserProfile.css"
import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';


const UserProfilePageComponent = ({
  updateUserProfileApiRequest,
  fetchUser,
  userInfoFromRedux,
  setReduxUserState,
  reduxDispatch, 
  localStorage, 
  sessionStorage
}) => {
  const [validated, setValidated] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    success: "", error: ""
  });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const [user, setUser] = useState({})
  const userInfo = userInfoFromRedux;

  useEffect(() => {
    fetchUser(userInfo._id)
      .then((data) => {
        setUser(data); 
        // console.log(data)
      })
      .catch((er) => console.log(er));
  }, [userInfo._id])

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const name = form.name.value;
    const lastname = form.lastname.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const country = form.country.value;
    const zipCode = form.zipCode.value;
    const city = form.city.value;
    const state = form.state.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (event.currentTarget.checkValidity() === true && password === confirmPassword) {
      updateUserProfileApiRequest(name, lastname, phoneNumber, address, country, zipCode, city, state, password)
        .then(data => {
          console.log(data)
          // making donotlogout field in redux using session/local storage remaining by destructuring 
          reduxDispatch(setReduxUserState({ donotlogout: userInfo.donotlogout,...data.userUpdated }))
          setUpdateUserResponseState({ success: data.success, error: "" });
          // updating the other fields of userInfo in their respective storage
          if (userInfo.donotlogout) localStorage.setItem("userInfo", JSON.stringify({ donotlogout: true, ...data.userUpdated }));
          else sessionStorage.setItem("userInfo", JSON.stringify({ donotlogout: false, ...data.userUpdated }));
        })
        .catch((er) => {
          if (er.response) {
            setUpdateUserResponseState({
              error: er.response.data.message ? er.response.data.message : er.response.data
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
      // confirmPassword.setCustomValidity('');
      setPasswordsMatchState(true);
    } else {
      // confirmPassword.setCustomValidity('Passwords do not match');
      setPasswordsMatchState(false);
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-banner">
          <img
            src="https://www.addictioncenter.com/app/uploads/2020/01/online_shopping_addiction-scaled.jpeg"
            alt="Profile Banner"
            className="banner-image"
          />
        </div>
        <div className="profile-avatar">
          <img
            src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            alt="User Avatar"
            className="avatar-image"
          />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{user.name} {user.lastname}</h2>
          <p className="profile-email">johndoe@example.com</p>
        </div>
      </div>
      <div className="credentials my-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.name}
                name="name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="formBasiclastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.lastname}
                name="lastname"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                disabled
                type="email"
                defaultValue={user.email} />
              <Form.Control.Feedback type="invalid">
                Please Enter a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                // required
                type="text"
                placeholder='Enter your phone number'
                defaultValue={user.phoneNumber}
                name="phoneNumber"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="8" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder='Enter Your Street and House Number'
                defaultValue={user.address}
                name="address"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Country"
                name='country'
                defaultValue={user.country} />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                name='city'
                defaultValue={user.city}
                required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                name='state'
                defaultValue={user.state}
                required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="formBasicZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip"
                name='zipCode'
                defaultValue={user.zipCode}
                required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row>
            <Col md="6">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  minLength={3}
                  onChange={onChange}
                  isInvalid={!passwordsMatchState}
                  required />
                <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
                <Form.Text className='text-muted'>password should have at least 6 characters</Form.Text>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Repeat Password"
                  onChange={onChange}
                  isInvalid={!passwordsMatchState}
                  required />
                <Form.Control.Feedback type="invalid">Both passwords must match</Form.Control.Feedback>
              </Form.Group>
            </Col>

          </Row>

          <Button type="submit" className='my-4'>Update</Button>

          <Alert
            show={updateUserResponseState && updateUserResponseState.error !== ""}
            variant="danger">
            Something went wrong
          </Alert>
          <Alert show={updateUserResponseState && updateUserResponseState.success === "user updated"}
            variant="info">
            User updated successfully!
          </Alert>

        </Form>
      </div>
      <div className="profile-content">
        <div className="section">
          <h3>Order History</h3>
          <ul className="order-list">
            <li>
              <span>Order #1234</span>
              <span>Date: 2023-06-20</span>
              <span>Total: $99.99</span>
            </li>
            <li>
              <span>Order #5678</span>
              <span>Date: 2023-06-15</span>
              <span>Total: $49.99</span>
            </li>
            {/* Add more order items here */}
          </ul>
        </div>
        <div className="section">
          <h3>Payment Method</h3>
          <div className="payment-method">
            <img
              src="https://example.com/payment-icon.png"
              alt="Payment Method Icon"
              className="payment-icon"
            />
            <span className="payment-details">**** **** **** 1234</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePageComponent;
