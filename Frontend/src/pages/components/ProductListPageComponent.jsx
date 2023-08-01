import { useEffect, useState } from 'react'
import ProductForListComponent from '../../components/ProductForListComponent'
import PaginationComponent from '../../components/PaginationComponent'
import SortOptionsComponent from '../../components/SortOptionsComponent'
import PriceFilterComponent from '../../components/filterQueryResultOptions/PriceFilterComponent'
import RatingFilterComponent from '../../components/filterQueryResultOptions/RatingFilterComponent'
import CategoryFilterComponent from '../../components/filterQueryResultOptions/CategoryFilterComponent'
import AttributeFilterComponent from '../../components/filterQueryResultOptions/AttributeFilterComponent'
import styled from 'styled-components'
import { MdFilterList } from 'react-icons/md'
import { useParams } from 'react-router-dom'

const UL = styled.ul`
    width: 75%;
    @media screen and (min-width: 770px) and (max-width: 1082px){
      width: 100%;
    }
    .list-group:focus{
      box-shadow: none;
    }
`;

// eslint-disable-next-line react/prop-types
const ProductListPageComponent = ({ getProducts, categories }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [attrFilter, setAttrFilter] = useState([])    // atributes from db
    const [attrsFromFilter, setAttrsFromFilter] = useState([]) // store choosen attributes for category user
    const [showResetFilterButton, setShowResetFilterButton] = useState(false)
    const [filters, setFilters] = useState({})      // COLLECT ALL FILTERS
    const [price, setPrice] = useState(500)
    const [ratingsFromFilter, setRatingsFromFilter] = useState({}) 
    const [categoriesFromFilter, setCategoriesFromFilter] = useState({}) 
    
    const { categoryName } = useParams() || ""
    
    useEffect(() => {
        getProducts()
        .then((productData) => {
            setProducts(productData.products);
            // console.log(productData.products)
            setLoading(false)
        })
        .catch(err => {
            setError(true)
        })

        console.log(filters)
    }, [filters]); // reload each time if filters changes

    useEffect(() => {
        if (categoryName) {
            const categoryAllData = categories.find(item => item.name === categoryName.replaceAll(",", "/"));
            // console.log(categoryAllData)
            if (categoryAllData) {
                let mainCategory = categoryAllData.name.split("/")[0];
                let index = categories.findIndex(item => item.name === mainCategory)
                setAttrFilter(categories[index].attrs)
            } else {
                setAttrFilter([])
            }
        }
    }, [categoryName, categories])

    const handleFilters = () => {
        setShowResetFilterButton(true)
        setFilters({
            price: price,
            rating: ratingsFromFilter,
            attrs: attrsFromFilter,
        })
    }

    const resetFilters = () => {
        setShowResetFilterButton(false)
        setFilters({})
        window.location.href = "/product-list"
    }

    return (
        <div className='container-fluid'>
            {/* {console.log(attrsFromFilter)} */}
            <div className="row">
                <div className="col-md-3">
                    <UL className="list-group list-group-flush mt-3" >

                        <li className="list-group-item" style={{ display: 'flex' }}>
                            <SortOptionsComponent />
                            <button className='btn btn-primary' onClick={handleFilters}>
                                <MdFilterList title='filter' style={{ fontSize: '1.3rem' }} />
                            </button>
                        </li>

                        <li className="list-group-item">
                            FILTER: <br /> <hr />
                            <PriceFilterComponent price={price} setPrice={setPrice} />
                        </li>
                        <li className="list-group-item">
                            <RatingFilterComponent setRatingsFromFilter={setRatingsFromFilter} />
                        </li>
                        <li className="list-group-item">
                            <CategoryFilterComponent />
                        </li>
                        <li className="list-group-item">
                            <AttributeFilterComponent
                                attrFilter={attrFilter}
                                setAttrsFromFilter={setAttrsFromFilter}
                            />
                        </li>
                        {showResetFilterButton && (
                            <li className="list-group-item" onClick={resetFilters}>
                                <button className='btn btn-danger'>Reset Filter</button>
                            </li>
                        )}
                    </UL>
                </div>
                <div className="col-md-9">
                    {loading ? (
                        <h2>loading products....</h2>
                    ) : error ? (
                        <h2>{error}</h2>
                    ) : (
                        products.map((product) => (
                            <ProductForListComponent
                                product={product}
                                key={product._id}
                                images={product.images}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                rating={product.rating}
                                reviewsNumber={product.reviewsNumber}
                                productId={product._id}
                            />
                        ))

                    )}
                    <PaginationComponent />
                </div>
            </div>
        </div>
    )
}

export default ProductListPageComponent
