import axios from 'axios';
import EditProductPageCompoent from './components/EditProductPageCompoent';
import { useSelector } from 'react-redux';

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`)
  return data
}

const AdminEditProductPage = () => {
  const categories = useSelector(state => state.allCategories.categories)

  return <EditProductPageCompoent categories={categories} fetchProduct={fetchProduct} />
}
export default AdminEditProductPage
