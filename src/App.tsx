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

function App() {
  return (
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
                <Route path="/products" element={<ProductDisplay/>} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App
