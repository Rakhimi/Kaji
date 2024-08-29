'use client'

import React, { useEffect } from 'react';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

interface Product {
    name: string;
    cost: number | null;
    price: number | null;
    customers: number | null;
    revenue: number | null;
    isAdded: boolean;
}

interface ProductProps {
    register: any;
    fields: any[];
    append: (value: Product) => void;
    remove: (index: number) => void;
    update: (index: number, value: Product) => void;
    watch: any;
    setValue: any;
}

const ProductList: React.FC<ProductProps> = ({ register, fields, append, remove, update, watch, setValue }) => {

    const calculateRevenue = (price: number | null, cost: number | null, customers: number | null) => {
        if (price !== null && customers !== null && cost !== null) {
            return Number(((price - cost) * customers).toFixed(2));
        }
        return null;
    };

    const calculateTotalRevenue = () => {
        const totalRevenue = fields.reduce((sum, product) => sum + (product.revenue ?? 0), 0);
        setValue('totalProductsRevenue', parseFloat(totalRevenue.toFixed(2)));
    };

    const handleAppend = (index: number) => {
        const price = watch(`productsRevenue.${index}.price`);
        const cost = watch(`productsRevenue.${index}.cost`);
        const customers = watch(`productsRevenue.${index}.customers`);
        const name = watch(`productsRevenue.${index}.name`);

        // Validate required fields
        if (price === null || cost === null || customers === null || price <= 0 || cost <= 0 || customers <= 0) {
            toast.error('Please fill out all required fields with values greater than 0 before adding.');
            
            return;
        }

        const currentProduct = fields[index];
        const updatedProduct = {
            ...currentProduct,
            name,
            price,
            cost,
            customers,
            isAdded: true,
            revenue: calculateRevenue(price, cost, customers),
        };

        update(index, updatedProduct);
        append({ name: '', cost: null, price: null, customers: null, revenue: null, isAdded: false });

        // Update total revenue after appending a product
        calculateTotalRevenue();
    };

    // Calculate total revenue only when the `fields` change
    useEffect(() => {
        calculateTotalRevenue();
    }, [fields]);

    return (
        <div className="w-full">
            <h1 className='py-4 font-bold text-lg'>Products Revenue</h1>
            {fields.map((product, index) => {
                const price = watch(`productsRevenue.${index}.price`);
                const cost = watch(`productsRevenue.${index}.cost`);
                const customers = watch(`productsRevenue.${index}.customers`);
                const revenue = calculateRevenue(price, cost, customers);

                // Check if all required fields are filled
                const isReadyToAdd = price !== null && cost !== null && customers !== null;

                return (
                    <div key={product.id} className="flex flex-col md:flex-row gap-4 items-center mb-2">
                        <Input
                            type="text"
                            {...register(`productsRevenue.${index}.name`)}
                            className="border rounded p-2 flex-1 border-gray-300"
                            placeholder="Product Name"
                            disabled={product.isAdded}
                        />
                        <Input
                            type="number"
                            {...register(`productsRevenue.${index}.cost`)}
                            className="border rounded p-2 flex-1 border-gray-300"
                            placeholder="Cost"
                            step="0.01"
                            min="0.01"
                            disabled={product.isAdded}
                        />
                        <Input
                            type="number"
                            {...register(`productsRevenue.${index}.price`)}
                            className="border rounded p-2 flex-1 border-gray-300"
                            placeholder="Price"
                            step="0.01"
                            min="0.01"
                            disabled={product.isAdded}
                        />
                        <Input
                            type="number"
                            {...register(`productsRevenue.${index}.customers`)}
                            className="border rounded p-2 flex-1 border-gray-300"
                            placeholder="Estimated Customers"
                            min="1"
                            disabled={product.isAdded}
                        />
                        <Input
                            type="number"
                            value={revenue !== null ? revenue.toString() : ''}
                            readOnly
                            className="border rounded p-2 flex-1 bg-gray-300 font-black"
                            placeholder="Projected Revenue"
                            disabled
                            step="0.01"
                        />
                        {product.isAdded ? (
                            <button onClick={() => {
                                remove(index);
                                calculateTotalRevenue();
                            }} className="text-red-700 font-bold px-2">
                                <FaMinusCircle className='text-3xl' />
                            </button>
                        ) : (
                            <button 
                                onClick={() => handleAppend(index)} 
                                className={`text-sky-500 font-bold px-2 ${!isReadyToAdd ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!isReadyToAdd}
                            >
                                <FaPlusCircle className='text-3xl' />
                            </button>
                        )}
                    </div>
                );
            })}
            <div className="w-full flex justify-end mt-4">
                <div className="w-1/4">
                    <Input
                        type="number"
                        value={watch('totalProductsRevenue')}
                        readOnly
                        className="border rounded p-2 flex-1 bg-gray-300 font-black"
                        placeholder="Total Revenue"
                        disabled
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductList;
