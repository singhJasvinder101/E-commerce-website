import React, { Fragment, useRef } from 'react'
import { useState } from 'react';
import { Alert, Button, CloseButton, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { GrFormClose } from 'react-icons/gr'
import { changeCategory, setValuesForAttrFromDBSelectForm, setAttributeTableWrapper } from './utils/utils';
const CreateProductPageComponent = ({
    createProductApiRequest,
    uploadImageApiRequest,
    uploadImagesCloudinaryApiRequest,
    categories,
    dispatch,
    insertCategory,
    deleteCategory,
    saveAttributeToCategoryDoc
}) => {
    const [validated, setValidated] = useState(false);
    const [attributesTable, setAttributesTable] = useState([])
    const [imageFiles, setImagesFiles] = useState(false)
    const [isCreating, setIsCreating] = useState("")
    const [createProductResponseState, setCreateProductResponseState] = useState({ message: "", error: "" })
    const [categoryChoosen, setCategoryChoosen] = useState("choose category")
    const [attributesFromDB, setAttributesFromDB] = useState([])

    const navigate = useNavigate()

    const attrsVal = useRef(null)
    const attrsKey = useRef(null)
    const createNewAttrKey = useRef(null)   // use ref to clean both inputs without refreshing
    const createNewAttrValue = useRef(null)

    const [newAttrKey, setNewAttrKey] = useState(false)     // for controlling behavior of message
    const [newAttrValue, setNewAttrValue] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;

        const formInputs = {
            name: form.name.value,
            description: form.description.value,
            count: form.count.value,
            price: form.price.value,
            category: form.category.value,
            attributesTable: attributesTable
        }
        if (event.currentTarget.checkValidity() === true) {
            if (imageFiles.length > 3) {
                setIsCreating("too many files");
                return
            }
            // console.log(formInputs)
            createProductApiRequest(formInputs)
                .then(data => {
                    if (imageFiles) {
                        if (process.env.NODE_ENV !== 'production') {
                            // to do: change to !== 'production
                            uploadImageApiRequest(imageFiles, data.productId)
                                .then(data => { })
                                .catch(error => {
                                    setIsCreating(error.response ? error.response.data.message : error.message);
                                })
                        } else {
                            uploadImagesCloudinaryApiRequest(imageFiles, data.productId)
                        }
                    }
                    if (data.message === "product created") {
                        navigate('/admin/products')
                    }
                })
                .catch(error => {
                    setCreateProductResponseState({ error: error.response ? error.response.data.message : error.message })
                })
        }
        setValidated(true);
    };

    const uploadHandler = (images) => {
        setImagesFiles(images);
    }

    const newCategoryHandler = (e) => {
        let element = document.getElementById("cats")
        if (e.keyCode && e.keyCode === 13 && e.target.value) {
            // console.log(e.target.value);
            dispatch(insertCategory({ category: e.target.value }))
            setTimeout(() => {
                setCategoryChoosen(e.target.value);
                element.value = e.target.value;
                e.target.value = "";
            }, 2000);
        }
    };

    const deleteCategoryHandler = () => {
        let category = document.getElementById('cats').value
        dispatch(deleteCategory({ category }))
        setCategoryChoosen("choose category")
        // so as to select this text without refresing the page
    }

    const attributeValueSelectedForTable = (e) => {
        if (e.target.value !== "Choose Attribute Value") {
            // console.log(attrsKey.current.value)
            setAttributeTableWrapper(attrsKey.current.value, e.target.value, setAttributesTable)
        }
    }
    const deleteAttribute = (key) => {
        setAttributesTable(table => table.filter((item) => item.key !== key))
    }

    const newAttrKeyHandler = (e) => {
        e.preventDefault();
        setNewAttrKey(e.target.value);
        addNewAttributeManually(e);
    }

    const newAttrValueHandler = (e) => {
        e.preventDefault();
        setNewAttrValue(e.target.value);
        addNewAttributeManually(e);
    }


    const addNewAttributeManually = (e) => {
        if (e.keyCode && e.keyCode === 13) {
            if (newAttrKey && newAttrValue) {
                dispatch(saveAttributeToCategoryDoc({ newAttrKey, newAttrValue, categoryChoosen }))
                setAttributeTableWrapper(newAttrKey, newAttrValue, setAttributesTable)
                e.target.value = ""
                createNewAttrKey.current.value = ""
                createNewAttrValue.current.value = ""
                setNewAttrKey(false)
                setNewAttrValue(false)
            }
        }
    }

    const checkKeyDown = (e) => {       // to prevent reloading
        if (e.code === "Enter") e.preventDefault()
    };


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
                        <h2>Create a new Product</h2>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                            onKeyDown={(e) => checkKeyDown(e)}
                        >
                            <Form.Group className='mb-3' controlId='formBasic'>
                                <Form.Label> Name </Form.Label>
                                <Form.Control
                                    name='name'
                                    required
                                    type='text' />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                <Form.Label> Description </Form.Label>
                                <Form.Control
                                    name='description'
                                    required
                                    as="textarea"
                                    rows={3} />
                            </Form.Group>


                            <Form.Group className='mb-3' controlId='formBasicPrice'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    name='price'
                                    required
                                    type='text' />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicCount'>
                                <Form.Label> Count in Stock </Form.Label>
                                <Form.Control
                                    name='count'
                                    required
                                    type="number" />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicCategory'>
                                <Form.Label>
                                    Category
                                    <GrFormClose style={{ cursor: 'pointer' }} onClick={deleteCategoryHandler} />
                                    <small>(remove selected)</small>
                                </Form.Label>
                                <Form.Select
                                    id='cats'
                                    required
                                    name='category'
                                    aria-label='Default select example'
                                    // value={categoryChoosen}
                                    onChange={(e) => changeCategory(e, categories, setAttributesFromDB, setCategoryChoosen)}
                                >
                                    <option value="">choose category</option>
                                    {/* {console.log(categories)} */}
                                    {categories.map((category, idx) => (
                                        <option
                                            key={idx}
                                            label={category.name}
                                            value={category.name}  // Add this line to set the value for each option
                                        // selected={category.name === product.category}  // Use 'selected' directly here
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>


                            <Form.Group className='mb-3' controlId='formBasicNewCategory'>
                                <Form.Label>
                                    Or create a new category (e.g. computer/laptops/intel)
                                </Form.Label>
                                <Form.Control
                                    onKeyUp={newCategoryHandler}
                                    name='newCategory'
                                    type='text' />
                            </Form.Group>

                            {attributesFromDB.length > 0 && (
                                <Row className='mt-5'>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId='formBasicAttribute'>
                                            <Form.Label>Choose the attribute and set value</Form.Label>
                                            <Form.Select
                                                name='attrKey'
                                                aria-label='default select example'
                                                ref={attrsKey}
                                                onChange={(e) => setValuesForAttrFromDBSelectForm(e, attrsVal, attributesFromDB)}
                                            >
                                                <option value="">Choose Attribute</option>
                                                {attributesFromDB.map((item, idx) => (
                                                    <Fragment key={idx}>
                                                        <option value={item.key}>{item.key}</option>
                                                    </Fragment>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId='formBasicAttribute'>
                                            <Form.Label>Attribute Value</Form.Label>
                                            <Form.Select
                                                name='attrKey'
                                                aria-label='default select example'
                                                ref={attrsVal}
                                                onChange={attributeValueSelectedForTable}
                                            >
                                                <option value="">Attribute Value</option>
                                                {attributesFromDB.map((item, idx) => (
                                                    <Fragment key={idx}>
                                                        <option value={item.value}>{item.value}</option>
                                                    </Fragment>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )}

                            <Row className='mt-4'>
                                {attributesTable.length > 0 && (
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Attribute</th>
                                                <th>Value</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attributesTable.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>{item.key}</td>
                                                    <td>{item.value}</td>
                                                    <td>
                                                        <CloseButton onClick={() => deleteAttribute(item.key)} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className='mb-3' controlId='formBasicNewAttribute'>
                                        <Form.Label>Create new attribute</Form.Label>
                                        <Form.Control
                                            ref={createNewAttrKey}
                                            disabled={["", "choose category"].includes(categoryChoosen)}
                                            placeholder='first choose or create a category'
                                            name='newAttrName'
                                            type='text'
                                            onKeyUp={newAttrKeyHandler}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className='mb-3' controlId='formBasicNewAttribute'>
                                        <Form.Label>attribute value</Form.Label>
                                        <Form.Control
                                            ref={createNewAttrValue}
                                            disabled={["", "choose category"].includes(categoryChoosen)}
                                            required={newAttrKey}
                                            placeholder='first choose or create a category'
                                            name='newAttrValue'
                                            type='text'
                                            onKeyUp={newAttrValueHandler}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>

                            <Alert show={!!newAttrKey && !!newAttrValue} variant='primary'>
                                After typing attribute key and value press enter on one of the field
                            </Alert>

                            <Form.Group controlId='formFileMultiple' className='mb-3'>
                                <Form.Label> Images </Form.Label>
                                <Form.Control
                                    required
                                    onChange={(e) => uploadHandler(e.target.files)}
                                    type='file'
                                    multiple />
                            </Form.Group>
                            {isCreating}

                            <Button variant='primary' type='submit'>
                                Submit
                            </Button>
                            {createProductResponseState.error ?? ""}

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateProductPageComponent
