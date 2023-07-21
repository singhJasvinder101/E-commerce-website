import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'

// components: 
import HeaderComponent from "./components/HeaderComponent"
import FooterComponent from "./components/FooterComponent"

// user components
import UserChatComponent from "./components/user/UserChatComponent"

// publicaly available pages
import HomePage from './pages/HomePage'
import ProductListPage from "./pages/ProductListPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CartPage from "./pages/CartPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

// Protected User pages
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent"
import UserProfilePage from "./pages/user/UserProfilePage"
import UserOrdersPage from "./pages/user/UserOrdersPage"
import UserCartDetails from "./pages/user/UserCartDetails"
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage"

// protected Admin Pages
import AdminUsersPage from "./pages/admin/AdminUsersPage"
import AdminEditUserPage from "./pages/admin/AdminEditUserPage"
import AdminProductsPage from "./pages/admin/AdminProductsPage"
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage"
import AdminEditProductPage from "./pages/admin/AdminEditProductPage"
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage"
import AdminOrdersPage from "./pages/admin/AdminOrdersPage"
import AdminChatsPage from "./pages/admin/AdminChatsPage"
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage"
import RouteWithUserChatComponent from "./components/user/RouteWithUserChatComponent"
import ScrollTop from "./utils/ScrollTop"

function App() {

  return (
    <Router>
      <HeaderComponent />
      <ScrollTop />
      <Routes>
        {/* for regular users on website */}
        <Route element={<RouteWithUserChatComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element="Page not found 404" />
        </Route>


        {/* user protected pages */}
        <Route element={<ProtectedRoutesComponent admin={false} />}>
          <Route path="/user" element={<UserProfilePage />} />
          <Route path="/user/my-orders" element={<UserOrdersPage />} />
          <Route path="/user/cart-details" element={<UserCartDetails />} />
          <Route path="/user/order-details/:id" element={<UserOrderDetailsPage />} />
        </Route>

        {/* Admin protected pages */}
        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin/user" element={<AdminUsersPage />} />
          <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/create-new-product" element={<AdminCreateProductPage />} />
          <Route path="/admin/edit-product/:id" element={<AdminEditProductPage />} />
          <Route path="/admin/order-details/:id" element={<AdminOrderDetailsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/chats" element={<AdminChatsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>

      </Routes>
      <FooterComponent />
    </Router>
  )
}

export default App
