'use client';

import React, { useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Input } from "@/components/ui/input";

interface Product {
    name: string;
    price: number | null;
    size: number | null;
    yield: number | null; // Number of Yield
    yieldTime: number | null; // Yield Time in Months
    revenue: number | null;
    isAdded: boolean;
}

const CropList: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([
        { name: '', price: null, size: null, yield: null, yieldTime: null, revenue: null, isAdded: false }
    ]);

    const handleIngredientChange = (index: number, field: keyof Product, value: string | number | null) => {
        const newProduct = [...products];
        newProduct[index] = {
            ...newProduct[index],
            [field]: value,
            revenue: calculateRevenue({ ...newProduct[index], [field]: value })
        };
        setProducts(newProduct);
    };

    const addIngredient = () => {
        setProducts([...products, { name: '', price: null, size: null, yield: null, yieldTime: null, revenue: null, isAdded: false }]);
    };

    const removeIngredient = (index: number) => {
        const newProduct = [...products];
        newProduct.splice(index, 1);
        setProducts(newProduct);
    };

    const disableIngredient = (index: number) => {
        const newProduct = [...products];
        newProduct[index].isAdded = true;
        setProducts(newProduct);
    };

    const calculateRevenue = (product: Product) => {
        if (product.price !== null && product.yield !== null && product.yieldTime !== null) {
            return Number(((product.price * product.yield) / product.yieldTime).toFixed(2));
        }
        return null;
    };

    const calculateTotalRevenue = () => {
        return products.reduce((sum, product) => sum + (product.revenue ?? 0), 0).toFixed(2);
    };

    return (
        <div className="w-full">
            {products.map((product, index) => (
                <div key={index} className="flex gap-4 items-center mb-2">
                    <Input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                        className="border rounded p-2 flex-1 border-gray-300"
                        placeholder="Crop Name"
                    />
                    <Input
                        type="number"
                        value={product.price !== null ? product.price.toString() : ''}
                        onChange={(e) => handleIngredientChange(index, 'price', e.target.value !== '' ? Number(e.target.value) : null)}
                        className="border rounded p-2 flex-1 border-gray-300"
                        placeholder="Price"
                    />
                    <Input
                        type="number"
                        value={product.size !== null ? product.size.toString() : ''}
                        onChange={(e) => handleIngredientChange(index, 'size', e.target.value !== '' ? Number(e.target.value) : null)}
                        className="border rounded p-2 flex-1 border-gray-300"
                        placeholder="Size"
                    />
                    <Input
                        type="number"
                        value={product.yield !== null ? product.yield.toString() : ''}
                        onChange={(e) => handleIngredientChange(index, 'yield', e.target.value !== '' ? Number(e.target.value) : null)}
                        className="border rounded p-2 flex-1 border-gray-300"
                        placeholder="Number of Yield"
                    />
                    <Input
                        type="number"
                        value={product.yieldTime !== null ? product.yieldTime.toString() : ''}
                        onChange={(e) => handleIngredientChange(index, 'yieldTime', e.target.value !== '' ? Number(e.target.value) : null)}
                        className="border rounded p-2 flex-1 border-gray-300"
                        placeholder="Yield Time in Months"
                    />
                    <Input
                        type="number"
                        value={product.revenue !== null ? product.revenue.toString() : ''}
                        readOnly
                        className="border rounded p-2 flex-1 border-gray-300 bg-gray-100"
                        placeholder="Revenue per Month"
                        disabled
                    />
                    {product.isAdded ? (
                        <button onClick={() => removeIngredient(index)} className="text-red-700 font-bold px-2">
                            <FaMinusCircle className='text-3xl' />
                        </button>
                    ) : (
                        <button onClick={() => { disableIngredient(index); addIngredient(); }} className="text-sky-500 font-bold px-2">
                            <FaPlusCircle className='text-3xl' />
                        </button>
                    )}
                </div>
            ))}
            <div className="w-full flex justify-end mt-4">
                <div className="w-1/4">
                    <Input
                        type="number"
                        value={calculateTotalRevenue()}
                        readOnly
                        className="border rounded p-2 flex-1 border-gray-300 bg-gray-100"
                        placeholder="Total Revenue"
                        disabled
                    />
                </div>
            </div>
        </div>
    );
};

export default CropList;
