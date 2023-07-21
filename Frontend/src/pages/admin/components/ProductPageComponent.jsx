import React from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent'

import { useState, useEffect } from 'react'
import { logoutUser } from '../../../../redux/store/slices/userLoginRegisterSlice'
import { useDispatch } from 'react-redux';

const ProductPageComponent = ({ fetchProducts, deleteProduct }) => {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([])
    const [productDeleted, setProductDeleted] = useState(false);


    const deleteHandler = async (productId) => {
        if (window.confirm("Are you sure, you want to delete the item")) {
            const data = await deleteProduct(productId)
            if (data.message === "product removed") {
                setProductDeleted(!productDeleted);
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        fetchProducts(controller)
            .then((res) => setProducts(res))
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    dispatch(logoutUser());
                }else {
                    console.log(error)
                }
            });


        // console.log(products)
        return () => controller.abort()
    }, [productDeleted])

    return (
        <div className="container-fluid">
            <Row className='container-fluid mt-5 px-auto'>
                <Col md={2}>
                    <AdminLinksComponent />
                </Col>
                <Col md={10}>
                    <h1>Product List
                        <Link className='mx-4 mb-1 btn btn-primary' to="/admin/create-new-product">Create New</Link>
                    </h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td> {item.name} </td>
                                    <td> {item.price}  </td>
                                    <td> {item.category} </td>
                                    <td>
                                        <Link to={`/admin/edit-product/${item._id}`} className='btn btn-sm btn-primary'>
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        {" / "}
                                        <button onClick={() => { deleteHandler(item._id) }} className='btn btn-sm btn-danger'>
                                            <i className="bi bi-x-circle"></i>
                                        </button>
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

export default ProductPageComponent

