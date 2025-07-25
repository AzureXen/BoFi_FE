export interface Transaction {
    id: number;
    user_id: number;
    full_name: string;
    order_code: number;
    status: string;
    created_at: string;
    amount: number;
}

export interface TransactionsResponse {
    error_code: number;
    message: string;
    description: string | null;
    data: {
        transactions: Transaction[];
        total_count: number;
    };
}
