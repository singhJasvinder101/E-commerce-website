import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent'

import { logoutUser } from '../../../../redux/store/slices/userLoginRegisterSlice';
import { useDispatch } from 'react-redux';

import axios from 'axios';


const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
    const dispatch = useDispatch()

    const [users, setUsers] = useState([])
    const [userDeleted, setUserDeleted] = useState(false);
    const [isAborted, setIsAborted] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        fetchUsers(controller)
            .then((res) => setUsers(res))
            .catch((error) => {
                // if (axios.isCancel(error)) {
                //     console.log('Request canceled:', error.message);
                // } else {
                //     console.log('Error:', error.message);
                // }
                if (error.response && error.response.status === 401) {
                    dispatch(logoutUser());
                }else {
                    console.log(error)
                }
            })

        return () => {
            controller.abort(); 
            // setIsAborted("aborted");
        };
    }, [userDeleted])


    const deleteHandler = async (userId) => {
        // to render new html instead of reloading i required state in 
        // useEffect such that when its changes the new html rendered fast
        if (window.confirm("Are you sure you want to delete user")) {
            const data = await deleteUser(userId);
            if (data === 'User removed') {
                setUserDeleted(!userDeleted)
            }
        }
    }
    // { console.log(users) }
    return (
        <div className="container-fluid">
            {isAborted && console.log(isAborted)}
            <Row className='container-fluid mt-5 px-auto'>
                <Col md={2}>
                    <AdminLinksComponent />
                </Col>
                <Col md="10">
                    <h1>User List</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>is Admin</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.isAdmin ? <i className="fa-solid fa-check text-success fw-bold"></i> : <i className="fa-solid fa-xmark text-danger fw-bold"></i>}
                                    </td>
                                    <td>
                                        <Link to={`/admin/edit-user/${user._id}`} className='btn btn-sm btn-primary'>
                                            <i className='bi bi-pencil-square'></i>
                                        </Link>
                                        {" / "}
                                        <Button variant='danger' className='btn-sm'
                                            onClick={() => deleteHandler(user._id)}>
                                            <i className='bi bi-x-circle'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}
export default UsersPageComponent
