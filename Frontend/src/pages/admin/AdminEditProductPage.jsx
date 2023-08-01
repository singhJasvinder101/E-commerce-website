import axios from 'axios';
import EditProductPageCompoent from './components/EditProductPageCompoent';
import { useDispatch, useSelector } from 'react-redux';
import { saveAttributeToCategoryDoc } from '../../../redux/store/slices/categorySlice';
import { uploadImageApiRequest, uploadImagesCloudinaryApiRequest } from './utils/utils';

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`)
  return data
}

const updateProductApiRequest = async (productId, formInputs) => {
  const { data } = await axios.patch(`/api/products/admin/${productId}`, { ...formInputs })
  return data;
}

const AdminEditProductPage = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.allCategories.categories)


  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath)
    if (process.env.NODE_ENV !== 'production') {
      // to do : !==
      // only its name value copied is encoded with var but in req.params(imp) we used .imagePath
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`)
    } else {
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}?cloudinary=true`)
    }
  }

  // const uploadHandler = async (images, productId) => {
  //   const formData = new FormData()
  //   Array.from(images).forEach(image => {
  //     formData.append("images", image)
  //   })
  //   await axios.post(`/api/products/admin/upload?productId=${productId}`, formData)
  // }

  return <EditProductPageCompoent
    categories={categories}
    fetchProduct={fetchProduct}
    updateProductApiRequest={updateProductApiRequest}
    dispatch={dispatch}
    saveAttributeToCategoryDoc={saveAttributeToCategoryDoc}
    imageDeleteHandler={imageDeleteHandler}
    uploadImageApiRequest={uploadImageApiRequest}
    uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
  />
}
export default AdminEditProductPage
