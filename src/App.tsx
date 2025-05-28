import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/User/HomePage/HomePage.tsx";
import LoginPage from "./pages/User/LoginPage/LoginPage.tsx";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
