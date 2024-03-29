import React, { Fragment, useRef } from 'react'
import { useState, useEffect } from 'react';
import { Alert, Button, CloseButton, Col, Container, Form, Image, Row, Table } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { changeCategory, setValuesForAttrFromDBSelectForm, setAttributeTableWrapper } from './utils/utils';

const EditProductPageCompoent = ({
    categories = [],
    fetchProduct,
    updateProductApiRequest,
    dispatch,
    saveAttributeToCategoryDoc,
    imageDeleteHandler,
    uploadImageApiRequest,
    uploadImagesCloudinaryApiRequest,
}) => {
    const [validated, setValidated] = useState(false);
    const [product, setProduct] = useState([])
    const [updateProductResponseState, setUpdateProductResponseState] = useState({
        message: '', error: ''
    })
    const [attributesFromDB, setAttributesFromDB] = useState([]) // for select lists
    const [attributesTable, setAttributesTable] = useState([])   // for html table
    const [categoryChoosen, setCategoryChoosen] = useState("choose category")
    const [newAttrKey, setNewAttrKey] = useState(false)
    const [newAttrValue, setNewAttrValue] = useState(false)
    const [imageRemoved, setImageRemoved] = useState(false)    // for refreshing page with images
    const [isUploading, setIsUploading] = useState("")
    const [imageUploaded, setImageUploaded] = useState(false)  // for refreshing page with images 

    const { id } = useParams()
    const navigate = useNavigate()


    const attrsVal = useRef(null)
    const attrsKey = useRef(null)
    const createNewAttrKey = useRef(null)
    const createNewAttrValue = useRef(null)

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
            updateProductApiRequest(id, formInputs)
                .then(data => {
                    if (data.message === "product updated") {
                        navigate("/admin/products")
                    }
                })
                .catch(err => {
                    setUpdateProductResponseState({
                        error: err.response.data.message ? err.response.data.message : err.response.data
                    })
                })
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
    useEffect(() => {
        fetchProduct(id)
            .then(product => {
                // console.log(product)
                setProduct(product)
            })
            .catch(err => {
                console.error(err)
            })
    }, [id, imageRemoved, imageUploaded])

    useEffect(() => {
        let categoryOfEditedProduct = categories.find(item => item.name === product.category)
        // console.log(categoryOfEditedProduct)
        if (categoryOfEditedProduct) {
            const mainCategoryOfEditedProduct = categoryOfEditedProduct.name.split("/")[0]
            const mainCategoryOfEditedProductAllData =
                categories.find(categoryOfEditedProduct =>
                    categoryOfEditedProduct.name === mainCategoryOfEditedProduct)
            if (mainCategoryOfEditedProductAllData && mainCategoryOfEditedProductAllData.attrs.length > 0) {
                setAttributesFromDB(mainCategoryOfEditedProductAllData.attrs)
            }
        }
        setCategoryChoosen(product.category)
        setAttributesTable(product.attrs)
        // these were the attributes of products existed already
    }, [product])


    // before that we set attributesFromDB according to product name that belongs to category
    // now we want to update the category and setting the attributes keys
    
    const attributeValueSelectedForTable = (e) => {
        if (e.target.value !== "Choose Attribute Value") {
            // console.log(attrsKey.current.value)
            setAttributeTableWrapper(attrsKey.current.value, e.target.value, setAttributesTable)
        }
    }
    const deleteAttribute = (key) => {
        setAttributesTable(table => table.filter((item) => item.key !== key))
    }

    const checkKeyDown = (e) => {
        if (e.code === "Enter") e.preventDefault()
    };

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
                            onSubmit={handleSubmit}
                            onKeyDown={(e) => checkKeyDown(e)}
                        >
                            <Form.Group className='mb-3' controlId='formBasicName'>
                                <Form.Label> Name </Form.Label>
                                <Form.Control
                                    name='name'
                                    required
                                    defaultValue={product.name}
                                    type='text' />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                <Form.Label> Description </Form.Label>
                                <Form.Control
                                    name='description'
                                    required
                                    as="textarea"
                                    defaultValue={product.description}
                                    rows={3} />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicCount'>
                                <Form.Label> Count in Stock </Form.Label>
                                <Form.Control
                                    name='count'
                                    defaultValue={product.count}
                                    required
                                    type="number" />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicPrice'>
                                <Form.Label>Price: $</Form.Label>
                                <Form.Control
                                    name='price'
                                    required
                                    type='text'
                                    defaultValue={product.price} />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicCategory'>
                                <Form.Label>
                                    Category
                                </Form.Label>
                                <Form.Select
                                    required
                                    name='category'
                                    aria-label='Default select example'
                                    onChange={() => changeCategory(e, categories, setAttributesFromDB, setCategoryChoosen)}
                                    value={categoryChoosen}
                                >
                                    <option value="choose category">choose category</option>
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

                            {/* {console.log(attributesFromDB)} */}
                            {attributesFromDB.length > 0 && (
                                <Row className='mt-5'>
                                    <Col md={6}>
                                        <Form.Group className='mb-3' controlId='formBasicAttribute'>
                                            <Form.Label>Choose the attribute and set value</Form.Label>
                                            <Form.Select
                                                name='attrKey'
                                                aria-label='default select example'
                                                ref={attrsKey}
                                                onChange={() => setValuesForAttrFromDBSelectForm(e, attrsVal, attributesFromDB)}
                                            >
                                                <option value="Choose Attribute">Choose Attribute</option>
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
                                                <option value="red">Color</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            )}

                            {/* {console.log(attributesTable)} */}
                            <Row className='mt-4'>
                                {attributesTable && attributesTable.length > 0 && (
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
                                            disabled={categoryChoosen === "choose category"}
                                            placeholder='first choose or create a category'
                                            name='newAttrKey'
                                            type='text'
                                            onKeyUp={newAttrKeyHandler}
                                            required={newAttrValue}
                                            ref={createNewAttrKey}
                                            onChange={(e) => setValuesForAttrFromDBSelectForm(e, attrsVal, attributesFromDB)}
                                        // isInvalid={categoryChoosen !== "choose category" && categoryChoosen && !newAttrKey}
                                        />

                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className='mb-3' controlId='formBasicNewAttribute'>
                                        <Form.Label>attribute value</Form.Label>
                                        <Form.Control
                                            disabled={categoryChoosen === "choose category"}
                                            placeholder='first choose or create a category'
                                            name='newAttrValue'
                                            type='text'
                                            onKeyUp={newAttrValueHandler}
                                            required={newAttrKey}
                                            ref={createNewAttrValue}
                                        // isInvalid={categoryChoosen !== "choose category" && categoryChoosen && !newAttrValue}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>

                            <Alert show={!!newAttrKey && !!newAttrValue} variant='primary'>
                                After typing attribute key and value press enter on one of the field
                            </Alert>

                            <Form.Group controlId='formFileMultiple' className='mb-3'>
                                <Form.Label> Images </Form.Label>
                                <Row>
                                    {product.images && product.images.map((image, idx) => (
                                        <Col key={idx} style={{ position: 'relative' }} md={3} xs={3}>
                                            <img
                                                // src="https://img1a.flixcart.com/fk-sp-static/21072015/blue-24744-yepme-8-400x400-imadqtjww8cwpthg.jpeg"
                                                src={image.path ?? null}
                                                alt=""
                                                className='img-fluid'
                                            />
                                            <i
                                                style={onHover}
                                                className='bi bi-x text-danger'
                                                onClick={() =>
                                                    imageDeleteHandler(image.path, id)
                                                        .then(data => {
                                                            setImageRemoved(!imageRemoved)
                                                        })
                                                }
                                            ></i>
                                        </Col>
                                    ))}
                                </Row>

                                <Form.Control
                                    // required
                                    type='file'
                                    multiple
                                    onChange={e => {
                                        setIsUploading("uploading images is in progress...")
                                        if (process.env.NODE_ENV !== 'production') {
                                            uploadImageApiRequest(e.target.files, id)
                                                .then(data => {
                                                    setIsUploading("uploading files completed")
                                                    setImageUploaded(!imageUploaded)
                                                })
                                                .catch(e => {
                                                    if (e.response) {
                                                        setIsUploading(e.response ? e.response.data.message : e.message);
                                                    }
                                                })
                                        } else {
                                            uploadImagesCloudinaryApiRequest(e.target.files, id)
                                            setIsUploading("upload file completed. wait for the take effect otherwise refresh page if necessary")
                                            setTimeout(() => {
                                                setImageUploaded(!imageUploaded)
                                            }, 5000);
                                        }
                                    }}
                                />
                                {isUploading}
                            </Form.Group>

                            <Button variant='primary' type='submit'>
                                Update
                            </Button>
                            {updateProductResponseState.error ?? ""}

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default EditProductPageCompoent
