import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/store/slices/userLoginRegisterSlice';

const AdminLinksComponent = () => {
  const dispatch = useDispatch()
  return (
    <div className='fw-bold' style={{fontFamily: 'Mulish'}}>
      <Navbar bg='light' variant='light'>
        <Nav className='d-flex flex-column'>
          <LinkContainer to="/admin/orders">
            <Nav.Link>Orders</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/products">
            <Nav.Link>Products</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/user">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/chats">
            <Nav.Link>Chats</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/analytics">
            <Nav.Link>Analytics</Nav.Link>
          </LinkContainer>
          <Nav.Link onClick={()=>dispatch(logoutUser())}>Logout</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default AdminLinksComponent;
