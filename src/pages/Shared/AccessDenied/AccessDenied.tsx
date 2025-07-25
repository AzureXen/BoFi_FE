import { useNavigate } from "react-router-dom";
import "./AccessDenied.css";

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div className="access-denied-container">
            <div className="access-denied-box">
                <h1>Access Denied</h1>
                <p>You don't have permission to access this page... :(</p>
                <button onClick={() => navigate("/")}>Go Home</button>
            </div>
        </div>
    );
};

export default AccessDenied;
