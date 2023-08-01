import CreateProductPageComponent from './components/CreateProductPageComponent';
import axios from 'axios';
import { uploadImageApiRequest, uploadImagesCloudinaryApiRequest } from './utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { insertCategory } from '../../../redux/store/slices/categorySlice';
import { deleteCategory, saveAttributeToCategoryDoc } from '../../../redux/store/slices/categorySlice';
const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post('/api/products/admin', { ...formInputs })
  return data
}


const AdminCreateProductPage = () => {
  const categories = useSelector(state => state.allCategories.categories)
  // console.log(categories)
  const dispatch = useDispatch()

  return <CreateProductPageComponent
    createProductApiRequest={createProductApiRequest}
    uploadImageApiRequest={uploadImageApiRequest}
    uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    categories={categories}
    dispatch={dispatch}
    insertCategory={insertCategory}
    deleteCategory={deleteCategory}
    saveAttributeToCategoryDoc={saveAttributeToCategoryDoc}
  />
}

export default AdminCreateProductPage
