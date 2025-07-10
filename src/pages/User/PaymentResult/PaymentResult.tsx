import { useSearchParams } from "react-router-dom";
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import "./PaymentResult.css";

const PaymentResult = () => {
    const [searchParams] = useSearchParams();

    const code = searchParams.get("code");
    const status = searchParams.get("status");
    const orderCode = searchParams.get("orderCode");
    const id = searchParams.get("id");
    const isCancelled = searchParams.get("cancel");

    const isSuccess = status === "PAID";
    const isFailure = status === "FAILED" || isCancelled === "true";

    const message = isSuccess
        ? "Payment Successful!"
        : isFailure
            ? "Payment Cancelled."
            : "Payment Status Unknown";

    return (
        <>
            <Header />
            <div className="payment-result-container">
                <h1>{message}</h1>

                <div className="payment-info-box">
                    <p><strong>Order Code:</strong> {orderCode || "N/A"}</p>
                    <p><strong>Status:</strong> {status || "N/A"}</p>
                    <p><strong>Transaction ID:</strong> {id || "N/A"}</p>
                    <p><strong>Code:</strong> {code || "N/A"}</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PaymentResult;
