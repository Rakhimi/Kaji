'use client'

import React, { useEffect } from 'react';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Input } from "@/components/ui/input";

interface Equipment {
    name: string;
    cost: number | null;
    isDisabled: boolean;
}

interface AccordionProps {
    register: any;
    fields: any[];
    append: (value: { name: string; cost: null; isDisabled: boolean; }) => void;
    remove: (index: number) => void;
    update: (index: number, value: { name: string; cost: null; isDisabled: boolean; }) => void;
    watch: any;
    setValue: any;
    itemsKey: string;  // Key for equipments array
    mainCostKey: string;    // Key for mainCost input
}

const Accordion: React.FC<AccordionProps> = ({ register, fields, append, remove, update, watch, setValue, itemsKey, mainCostKey }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
        if (!isOpen && fields.length === 0) {
            append({ name: '', cost: null, isDisabled: false });  // Automatically add the first equipment field
        }
    };

    const handleAddClick = (index: number) => {
        const currentValues = watch(`${itemsKey}.${index}`);
        update(index, { ...currentValues, isDisabled: true });
        append({ name: '', cost: null, isDisabled: false });
    };

    const equipments = watch(itemsKey);

    const totalCost = equipments?.reduce((acc: number, equipment: Equipment) => {
        const costString = equipment.cost ? equipment.cost.toString() : '0';
        const costNumber = parseFloat(costString) || 0;
        return acc + costNumber;
    }, 0) || 0;

    // useEffect to update mainCost when totalCost changes
    useEffect(() => {
        if (totalCost > 0) {
            setValue(mainCostKey, totalCost);
        }
    }, [totalCost, setValue, mainCostKey]);

    return (
        <div className="border-b last:border-b-0 mb-4">
            <div className="flex justify-between items-center p-4 bg-gray-100">
                <Input
                    type="number"
                    {...register(mainCostKey)}
                    disabled={fields.length > 1 || totalCost > 0}  // Disable mainCost input if totalCost is present
                    className="border rounded p-2 mr-4 w-1/2 border-gray-300"
                    placeholder="Enter cost"
                    min="1"
                />
                <span className="cursor-pointer text-2xl" onClick={toggleAccordion}>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
            </div>
            {isOpen && (
                <div className="p-2 bg-white">
                    {fields.map((item, index) => (
                        <div key={item.id} className="flex items-center mb-2">
                            <Input
                                type="text"
                                {...register(`${itemsKey}.${index}.name`)}
                                className="border rounded p-2 mr-2 flex-1 border-gray-300"
                                placeholder="Item name"
                            />
                            <Input
                                type="number"
                                {...register(`${itemsKey}.${index}.cost`)}
                                className="border rounded p-2 flex-1 border-gray-300"
                                placeholder="Cost"
                                step="0.01"
                                min="1"
                            />
                            {item.isDisabled ? (
                                <button onClick={() => remove(index)} className="text-red-700 font-bold px-2">
                                    <FaMinusCircle className='text-3xl'/>
                                </button>
                            ) : (
                                <button onClick={() => handleAddClick(index)} className="text-sky-500 font-bold px-2">
                                    <FaPlusCircle className='text-3xl'/>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Accordion;
