'use client';
import { Input } from '@/components/ui/input';
import { Slider } from "@/components/ui/slider";
import { Label } from '@radix-ui/react-label';
import React, { useEffect } from 'react';


interface CustomerProps {
    population: number | null;
    onPopulationChange: (value: number | null) => void;
    percentage: number;
    onPercentageChange: (value: number) => void;
    totalCustomer: number; 
    totalCustomerChange: (value: number) => void;
}

const Customer: React.FC<CustomerProps> = ({population, onPopulationChange, percentage, onPercentageChange, totalCustomer, totalCustomerChange}) => {

    const handlePopulationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? Number(e.target.value) : null;
        onPopulationChange(value);
    };

    const handlePercentageChange = (value: number[]) => {
        onPercentageChange(value[0]);
    };

    const calculateCustomers = (population: number, percentage: number) => {
        if (population === null || percentage === null) return 0;
        return Math.round((population * percentage) / 100);
    };

    useEffect(() => {
        if (population !== null) {
            totalCustomerChange(calculateCustomers(population, percentage));
        }
    }, [population, percentage]);

    return (
        <div className="max-w-lg mx-auto p-4 mb-2 border-2 rounded-md">
            <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Population in your business area
                </Label>
                <Input
                    type="number"
                    value={population !== null ? population : ''}
                    onChange={handlePopulationChange}
                    className="border rounded p-2 w-full border-gray-300"
                    placeholder='Total population'
                    min="1"
                />
            </div>

            <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Percentage of Population as Customers
                </Label>
                <div className="flex items-center gap-2">
                    <Slider
                        value={[percentage]}
                        onValueChange={handlePercentageChange}
                        max={100}
                        step={1}
                        className="flex-1 cursor-pointer"
                    />
                    <Input
                        type="number"
                        value={percentage}
                        onChange={(e) => handlePercentageChange([Number(e.target.value)])}
                        className="w-16 text-center border-gray-300"
                        min="1"
                    />
                </div>
            </div>

            <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Customers
                </Label>
                <Input
                    type="number"
                    value={totalCustomer}
                    readOnly
                    disabled
                    className="bg-gray-300 font-black"
                />
            </div>
        </div>
    );
};

export default Customer;
