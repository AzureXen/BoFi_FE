import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/User/HomePage/HomePage.tsx";
import LoginPage from "./pages/User/LoginPage/LoginPage.tsx";
import Contact from "./pages/User/Contact/Contact.tsx";
import BoFiTechnology from "./pages/User/BoFiTechnology/BoFiTechnology.tsx";
import PrivacyPolicy from "./pages/User/PrivacyPolicy/PrivacyPolicy.tsx";
import WarrantyReturn from "./pages/User/WarrantyReturn/WarrantyReturn.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import UploadImage from "./pages/User/UploadImage/UploadImage.tsx";
import AboutDirtyCoins from "./pages/User/AboutDirtyCoins/AboutDirtyCoins.tsx";
import ProductDisplay from "./pages/User/ProductDisplay/ProductDisplay.tsx";
import {AuthProvider} from "./components/Authentication/AuthProvider.tsx";
import ProductDetail from "./pages/User/ProductDetail/ProductDetail.tsx";
import MeasuringOutcome from "./pages/User/MeasuringOutcome/MeasuringOutcome.tsx";
import UserProfile from "./pages/User/UserProfile/UserProfile.tsx";
import UserWishlist from "./pages/User/UserWishlist/UserWishlist.tsx";
import {ToastContainer} from "react-toastify";
import PurchaseHistory from "./pages/User/PurchaseHistory/PurchaseHistory.tsx";
import ProductManager from "./pages/Admin/ProductManagement/ProductManager.tsx";

function App() {
  return (
      <>
        <AuthProvider>
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/bofi" element={<BoFiTechnology/>} />
                    <Route path="/privacy" element={<PrivacyPolicy/>} />
                    <Route path="/warranty" element={<WarrantyReturn/>} />
                    <Route path="/upload" element={<UploadImage/>} />
                    <Route path="/dirtycoins" element={<AboutDirtyCoins/>} />
                    <Route path="/products/:typeParam?" element={<ProductDisplay/>} />
                    <Route path="/products/detail/:productId" element={<ProductDetail/>} />
                    <Route path="/measure" element={<MeasuringOutcome/>} />
                    <Route path="/profile" element={<UserProfile/>} />
                    <Route path="/wishlist" element={<UserWishlist/>} />
                    <Route path="/history" element={<PurchaseHistory/>} />
                    <Route path="/manage" element={<ProductManager/>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </>
  )
}

export default App
