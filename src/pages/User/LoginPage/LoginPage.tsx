import "./LoginPage.css"
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";

// import dirtyCoins from "../../../assets/login-page/dirty-coins.png"
// import hidePassword from "../../../assets/login-page/hide-password.png"
// import showPassword from "../../../assets/login-page/show-password.png"
// import passwordIcon from "../../../assets/login-page/password-icon.png"
// import regEmail from "../../../assets/login-page/reg-email.png"
// import regFacebook from "../../../assets/login-page/reg-facebook.png"
// import regTwitter from "../../../assets/login-page/reg-twitter.png"
// import userIcon from "../../../assets/login-page/user-icon.png"

const LoginPage = ()=>{
    return(
        <>
            <Header/>
            <div className="login-page">
                <div className="icon-holder">

                </div>
                <div className="login-form"></div>
                <div className="register-options"></div>
            </div>
            <Footer/>
        </>
    )
}
export default LoginPage;