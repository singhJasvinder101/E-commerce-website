import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import styled from 'styled-components';
import { BsCartDash, BsSearch } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../redux/store/slices/userLoginRegisterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/store/slices/categorySlice';


const Header = styled.header`
    .container {
        max-width: 90% !important;
    }
    .navbar{
        height: 3.7rem;
    }
    .container > a{
        font-size: 1.6rem;
    }
    .collapse a{
        font-size: 1.4rem;
    }
    .nav-item{
        padding: 0.5rem;
        align-items: center;
    }
    .badge{
        left: 4.3rem !important;
    }
    .search-container{
        border-radius: 0.8rem !important;
        // border: 2px solid red !important;
    }
    .form-control,
    .btn {
        border-radius: 2px;
        height: 2.2rem;
    }
    @media (max-width: 1200px) {
        .nav-item{
            padding: 0.2rem !important;
        }
        .nav-item:nth-child(1){
            padding-right: 0 !important;
        }
        .nav-item:nth-child(2){
            padding-left: 0 !important;
        }
    }
`;



const HeaderComponent = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.userLoginRegister)

    const itemsCount = useSelector(state => state.cart.itemsCount)
    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])
    const categories = useSelector(state => state.allCategories.categories)

    return (
        <Header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container" id='container'>
                    <Link className="navbar-brand" to="/">E-commerce Website</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item d-flex align-items-center">
                                <div className="search-container d-flex align-items-center">
                                    <Dropdown >
                                        <Dropdown.Toggle
                                            style={{ height: '2.2rem' }}
                                            variant="primary"
                                            id="dropdown-basic">
                                            All
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {categories.map((category, idx) => (
                                            <Dropdown.Item
                                                key={idx}
                                                style={{ fontSize: '1rem' }} >
                                                    {category.name}
                                            </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <input
                                        type="text"
                                        style={{ height: "2.2rem" }}
                                        placeholder="Search"
                                        className="form-control"
                                    >
                                    </input>
                                    <button className='btn btn-warning' style={{ height: '2.2rem' }}>
                                        <BsSearch size={16} />
                                    </button>
                                </div>
                            </li>
                            {/* 
                            </li>
                            <li className="nav-item">
                                <SearchContainer style={{ marginTop: '0.25rem' }}>
                                    <input
                                        type="text"
                                        style={{ height: '2.2rem' }}
                                        placeholder="Search"
                                        className="form-control" />
                                     <BsSearch size={18} /> 
                                </SearchContainer> */}
                            {userInfo.isAdmin ? (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link position-relative"
                                        style={{ fontSize: '1rem' }}
                                        to="/admin/orders">
                                        Admin
                                        <span
                                            className="position-absolute top-5 start-100 translate-middle p-2 bg-success border border-light rounded-circle"
                                        >
                                        </span>
                                    </Link>
                                </li>
                            ) : userInfo.name && !userInfo.isAdmin ? (
                                <li className="nav-item">
                                    <Dropdown>
                                        <Dropdown.Toggle className='bg-transparent' id="user-dropdown" style={{ fontSize: '1rem', borderRadius: '8rem', color: "#ffffff", borderColor: "#ffffff" }}>
                                            <i className="fa-regular fa-user" style={{ color: "#ffffff" }}></i>
                                            <span>  {userInfo.name} {userInfo.lastname}</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                style={{ fontSize: '1.1rem' }}
                                                as={Link}
                                                to="/user"> Profile
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                style={{ fontSize: '1.1rem' }}
                                                as={Link}
                                                to="/user/my-orders"> My Orders
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                style={{ fontSize: '1.1rem' }}
                                                onClick={() => dispatch(logoutUser())}
                                            > Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            style={{ fontSize: '1.02rem' }}
                                            to="/login">
                                            LogIn
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            style={{ fontSize: '1rem' }}
                                            to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <Link
                                    className="nav-link position-relative"
                                    style={{ fontSize: '1rem', width: '5rem' }} to="/cart">Cart
                                    <span className="position-absolute top-5  start-100 translate-middle badge rounded-pill bg-danger">
                                        {itemsCount === 0 ? "" : itemsCount}
                                    </span>
                                    <BsCartDash style={{ margin: '0.4rem' }} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Header>
    )
}

export default HeaderComponent
