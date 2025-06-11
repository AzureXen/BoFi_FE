import React from 'react';
import Product from "../../models/Product/Product.ts";
import ProductCard from "./ProductCard.tsx";
import "./Product.css"
const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
        <div className="products-container">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    productId={product.productId.toString()}
                    imgUrl={product.productImageUrl}
                    productName={product.productName}
                    productPrice={product.productPrice.toString()}
                />
            ))}
        </div>
    );
};

export default ProductGrid;