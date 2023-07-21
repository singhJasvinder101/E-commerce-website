import ProductPageComponent from "./components/ProductPageComponent"
import axios from "axios";

const fetchProducts = async (controller) => {
  const { data } = await axios.get("/api/products/admin", {
    signal: controller.signal
  });
  return data;
}

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/products/admin/${productId}`);
  return data
}

const AdminProductsPage = () => {
  return <ProductPageComponent fetchProducts={fetchProducts} deleteProduct={deleteProduct}/>
}

export default AdminProductsPage

