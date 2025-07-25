import "./TransactionDisplay.css"
import Header from "../../../components/Header/Header.tsx";
import Footer from "../../../components/Footer/Footer.tsx";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import type {Transaction, TransactionsResponse} from "../../../models/Transaction/Transaction.tsx";
import axios from "axios";

import {API_BASE_URL} from "../../../config.ts";
import {useAuth} from "../../../components/Authentication/AuthProvider.tsx";
const API_GET_ALL_TRANSACTIONS = "/payments/transactions"

function getStatusClass(status: string): string {
    switch (status) {
        case "paid":
            return "status-paid";
        case "cancelled":
            return "status-cancelled";
        case "expired":
            return "status-expired";
        default:
            return "status-default";
    }
}

const TransactionDisplay = () =>{
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

    const {token, user} = useAuth(); // Assuming user object contains role information
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserRole = () => {
            setIsCheckingAuth(true);
            if (!user) {
                navigate('/access-denied');
                return;
            }

            if (user.role !== 'admin') {
                navigate('/access-denied');
                return;
            }

            setIsCheckingAuth(false);
        };

        checkUserRole();
    }, [user, navigate]);

    useEffect(() => {
        if (!isCheckingAuth && user?.role === 'admin') {
            const fetchTransactions = async () => {
                try {
                    const response = await axios.get<TransactionsResponse>(
                        `${API_BASE_URL}${API_GET_ALL_TRANSACTIONS}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.data.error_code === 0) {
                        setTransactions(response.data.data.transactions);
                    } else {
                        setError(response.data.message);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (err) {
                    setError("Failed to fetch transactions");
                } finally {
                    setLoading(false);
                }
            };

            fetchTransactions();
        }
    }, [isCheckingAuth, user, token]);

    if (isCheckingAuth) {
        return <p className="loading-message">Checking authorization...</p>;
    }

    if (loading) return <p className="loading-message">Loading transactions...</p>;

    if (error) return <p className="error-message">{error}</p>;

    return(
        <>
            <Header/>
            <div className="transaction-display">
                <div className="transaction-container">
                    <h2 className="transaction-header">Transaction List</h2>
                    <div className="table-wrapper">
                        <table className="transaction-table">
                            <thead className="table-header">
                            <tr>
                                <th className="table-header-cell">#</th>
                                <th className="table-header-cell">Order Code</th>
                                <th className="table-header-cell">Full Name</th>
                                <th className="table-header-cell">Status</th>
                                <th className="table-header-cell">Amount (₫)</th>
                                <th className="table-header-cell">Created At</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transactions.map((txn, index) => (
                                <tr key={index} className="table-row">
                                    <td className="table-cell index-cell">{txn.id}</td>
                                    <td className="table-cell order-code-cell">{txn.order_code}</td>
                                    <td className="table-cell">{txn.full_name}</td>
                                    <td className={`table-cell ${getStatusClass(txn.status)}`}>
                                        {txn.status}
                                    </td>
                                    <td className="table-cell amount-cell">{txn.amount.toLocaleString("vi-VN")}</td>
                                    <td className="table-cell date-cell">{new Date(txn.created_at).toLocaleString("vi-VN")}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default TransactionDisplay;