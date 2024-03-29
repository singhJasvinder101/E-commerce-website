import ProductListPageComponent from "./components/ProductListPageComponent";
import axios from "axios";
import { useSelector } from 'react-redux'

const getProducts = async () => {
  const { data } = await axios.get("/api/products")
  return data
}

const ProductListPage = () => {
  const { categories } = useSelector(state => state.allCategories)

  return <ProductListPageComponent getProducts={getProducts} categories={categories} />
}

export default ProductListPage
