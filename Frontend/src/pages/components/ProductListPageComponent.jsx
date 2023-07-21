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

const UL = styled.ul`
    width: 75%;
    @media screen and (min-width: 770px) and (max-width: 1082px){
      width: 100%;
    }
    .list-group:focus{
      box-shadow: none;
    }
`;

// const images = [
//     "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
//     "https://rukminim1.flixcart.com/image/612/612/xif0q/watch/t/r/5/-original-imagqfu3mnhxw25p.jpeg?q=70",
//     "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFibGV0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
//     "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
//     "https://media.istockphoto.com/id/182927542/photo/printer-and-scanner.webp?b=1&s=170667a&w=0&k=20&c=fun6kS9q-_-GOE3W9BmOvPNTe-OdTYpsbD53lj3LH4U=",
//     "https://plus.unsplash.com/premium_photo-1661592645319-cb83e4c6b324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29mdHdhcmVzJTIwaW1hZ2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
//     "https://images.unsplash.com/photo-1524006231331-78f794ebbbac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhJTIwaW1hZ2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
//     "https://media.istockphoto.com/id/1158413597/photo/composition-with-books-on-the-table.webp?b=1&s=170667a&w=0&k=20&c=EaTlcV16ocCqsteyory_CRiYqIW5VwI1PytlkxhN8UQ=",
// ]


// eslint-disable-next-line react/prop-types
const ProductListPageComponent = ({ getProducts }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((productData) => { setProducts(productData.products); console.log(productData.products) })
    }, []);

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-3">
                    <UL className="list-group list-group-flush mt-3" >
                        <li className="list-group-item" style={{ display: 'flex' }}>
                            <SortOptionsComponent />
                            <button className='btn btn-primary'>
                                <MdFilterList title='filter' style={{ fontSize: '1.3rem' }} />
                            </button>
                        </li>
                        <li className="list-group-item">
                            FILTER: <br /> <hr />
                            <PriceFilterComponent />
                        </li>
                        <li className="list-group-item">
                            <RatingFilterComponent />
                        </li>
                        <li className="list-group-item">
                            <CategoryFilterComponent />
                        </li>
                        <li className="list-group-item">
                            <AttributeFilterComponent />
                        </li>
                        <li className="list-group-item">
                            <button className='btn btn-primary'>Reset Filter</button>
                        </li>
                    </UL>
                </div>
                <div className="col-md-9">
                    {products.map((product) => (
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
                    ))}
                    <PaginationComponent />
                </div>
            </div>
        </div>
    )
}

export default ProductListPageComponent
